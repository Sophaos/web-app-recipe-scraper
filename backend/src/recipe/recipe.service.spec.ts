import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { getModelToken } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from 'src/recipe/recipe.schema';
import mongoose, { Connection, Model } from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { RECIPES_DOCUMENT_MOCK } from 'src/recipe/mocks/recipes-document.mock';
import { RECIPE_DTO_MOCK } from 'src/recipe/mocks/recipe.mock';
import { DeleteRecipesDto } from './dto/delete-recipes.dto';

describe('RecipeService', () => {
  jest.setTimeout(60000);
  let service: RecipeService;
  let mongoContainer: StartedMongoDBContainer;
  let recipeModel: Model<Recipe>;
  let dbConnection: Connection;

  beforeAll(async () => {
    mongoContainer = await new MongoDBContainer('mongo:6.0.1').start();
    const uri = mongoContainer.getConnectionString();

    dbConnection = await mongoose
      .createConnection(uri, { directConnection: true })
      .asPromise();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: getModelToken(Recipe.name),
          useValue: dbConnection.model(Recipe.name, RecipeSchema),
        },
      ],
    }).compile();

    service = module.get<RecipeService>(RecipeService);
    recipeModel = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  afterEach(async () => {
    await recipeModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoContainer.stop();
  });

  describe('create()', () => {
    it('should create a recipe', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...recipeWithoutId } = RECIPE_DTO_MOCK;
      const created = await service.create(recipeWithoutId);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.name).toEqual(recipeWithoutId.name);

      const found = await recipeModel.findById(created.id);
      expect(found).not.toBeNull();
      expect(found?.name).toEqual(recipeWithoutId.name);
    });
  });

  describe('findAll()', () => {
    it('should return all recipes, filtered by search term if provided', async () => {
      await recipeModel.insertMany(RECIPES_DOCUMENT_MOCK);

      const all = await service.findAll();
      expect(all.recipeCount).toEqual(RECIPES_DOCUMENT_MOCK.length);

      const filtered = await service.findAll('Pico de Gallo');
      expect(filtered.recipes).toHaveLength(1);
    });
  });

  describe('findOne()', () => {
    it('should return a recipe by ID', async () => {
      const doc = await recipeModel.insertOne(RECIPES_DOCUMENT_MOCK[0]);

      const found = await service.findOne(doc._id.toString());
      expect(found.name).toBe(RECIPES_DOCUMENT_MOCK[0].name);
    });

    it('should throw NotFoundException if ID not found', async () => {
      await expect(
        service.findOne(new mongoose.Types.ObjectId().toString()),
      ).rejects.toThrow('not found');
    });
  });

  describe('remove()', () => {
    it('should delete and return the deleted recipe', async () => {
      const doc = await recipeModel.insertOne(RECIPES_DOCUMENT_MOCK[0]);

      const deleted = await service.remove({ id: doc._id.toString() });
      expect(deleted.name).toBe(RECIPES_DOCUMENT_MOCK[0].name);

      const exists = await recipeModel.findById(doc._id);
      expect(exists).toBeNull();
    });
    it('should throw NotFoundException if ID not found', async () => {
      await expect(
        service.remove({ id: new mongoose.Types.ObjectId().toString() }),
      ).rejects.toThrow('not found');
    });
  });

  describe('removeMany()', () => {
    it('should delete multiple recipes and return the deleted recipes', async () => {
      const docs = await recipeModel.insertMany(RECIPES_DOCUMENT_MOCK);

      const idsToDelete = docs.slice(0, 2).map((doc) => doc._id.toString());
      const deleteRecipesDto: DeleteRecipesDto = { ids: idsToDelete };
      const deleted = await service.removeMany(deleteRecipesDto);

      expect(deleted).toHaveLength(2);
      expect(deleted[0].name).toBe(RECIPES_DOCUMENT_MOCK[0].name);
      expect(deleted[1].name).toBe(RECIPES_DOCUMENT_MOCK[1].name);

      const exists0 = await recipeModel.findById(idsToDelete[0]);
      const exists1 = await recipeModel.findById(idsToDelete[1]);
      expect(exists0).toBeNull();
      expect(exists1).toBeNull();

      const stillExists = await recipeModel.findById(docs[2]._id);
      expect(stillExists).not.toBeNull();
    });

    it('should throw NotFoundException if no IDs are found', async () => {
      const randomIds = [
        new mongoose.Types.ObjectId().toString(),
        new mongoose.Types.ObjectId().toString(),
      ];
      const deleteRecipesDto: DeleteRecipesDto = { ids: randomIds };

      await expect(service.removeMany(deleteRecipesDto)).rejects.toThrow(
        'No recipes found for the provided IDs',
      );
    });
  });
});
