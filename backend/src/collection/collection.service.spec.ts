import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collection/collection.schema';
import mongoose, { Connection, Model } from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { CollectionService } from './collection.service';
import { CREATE_COLLECTION_DTO_MOCK } from './mocks/collection-dto.mock';
import { COLLECTION_DAO_LIST_WITHOUT_ID_MOCK } from './mocks/collection-dao.mock';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Recipe, RecipeSchema } from 'src/recipe/recipe.schema';
import { RecipeService } from 'src/recipe/recipe.service';
import { RECIPES_DOCUMENT_MOCK } from 'src/recipe/mocks/recipes-document.mock';
import { CreateCollectionDto } from './dto/create-collection.dto';

describe('CollectionService', () => {
  jest.setTimeout(60000);
  let service: CollectionService;
  let mongoContainer: StartedMongoDBContainer;
  let collectionModel: Model<Collection>;
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
        CollectionService,
        RecipeService,
        {
          provide: getModelToken(Collection.name),
          useValue: dbConnection.model(Collection.name, CollectionSchema),
        },
        {
          provide: getModelToken(Recipe.name),
          useValue: dbConnection.model(Recipe.name, RecipeSchema),
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    collectionModel = module.get<Model<Collection>>(
      getModelToken(Collection.name),
    );
    recipeModel = module.get<Model<Recipe>>(getModelToken(Recipe.name));
  });

  afterEach(async () => {
    await collectionModel.deleteMany({});
    await recipeModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoContainer.stop();
  });

  describe('create()', () => {
    it('should create a collection', async () => {
      const recipes = await recipeModel.insertMany(RECIPES_DOCUMENT_MOCK);
      const ids = recipes.map((r) => r._id);
      const collectionWithRecipes: CreateCollectionDto = {
        ...CREATE_COLLECTION_DTO_MOCK,
        recipeIds: ids,
      };
      const created = await service.create(collectionWithRecipes);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.name).toEqual(CREATE_COLLECTION_DTO_MOCK.name);
      expect(created.recipes).toHaveLength(recipes.length);
    });
  });

  describe('findAll()', () => {
    it('should return all collections', async () => {
      await collectionModel.insertMany(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK);

      const all = await service.findAll();
      expect(all).toHaveLength(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK.length);
    });

    it('should return all collections filtered', async () => {
      await collectionModel.insertMany(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK);

      const all = await service.findAll('Banana bread');
      expect(all).toHaveLength(1);
    });
  });

  describe('findOne()', () => {
    it('should return a collection by ID', async () => {
      const doc = await collectionModel.insertOne(
        COLLECTION_DAO_LIST_WITHOUT_ID_MOCK[0],
      );

      const found = await service.findOne(doc._id.toString());
      expect(found.name).toBe(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK[0].name);
    });

    it('should throw NotFoundException if ID not found', async () => {
      await expect(
        service.findOne(new mongoose.Types.ObjectId().toString()),
      ).rejects.toThrow('not found');
    });
  });

  describe('updateCollection()', () => {
    it('should return a collection by ID', async () => {
      const inserted = await collectionModel.insertMany(
        COLLECTION_DAO_LIST_WITHOUT_ID_MOCK,
      );

      const idToUpdate = inserted[0]._id.toString();
      const collectionDTO: UpdateCollectionDto = {
        id: idToUpdate,
        name: 'test',
        description: 'updated description',
        recipeIds: [],
      };

      const found = await service.updateCollection(collectionDTO);
      expect(found.name).toBe(collectionDTO.name);
      expect(found.description).toBe(collectionDTO.description);
    });

    it('should throw NotFoundException if ID not found', async () => {
      const collectionDTO: UpdateCollectionDto = {
        id: new mongoose.Types.ObjectId().toString(),
        name: 'test',
        description: 'updated description',
        recipeIds: [],
      };
      await expect(service.updateCollection(collectionDTO)).rejects.toThrow(
        'not found',
      );
    });
  });

  describe('remove()', () => {
    it('should delete and return the deleted collection', async () => {
      const doc = await collectionModel.insertOne(
        COLLECTION_DAO_LIST_WITHOUT_ID_MOCK[0],
      );

      const deleted = await service.remove({ id: doc._id.toString() });
      expect(deleted.name).toBe(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK[0].name);

      const exists = await collectionModel.findById(doc._id);
      expect(exists).toBeNull();
    });
    it('should throw NotFoundException if ID not found', async () => {
      await expect(
        service.remove({ id: new mongoose.Types.ObjectId().toString() }),
      ).rejects.toThrow('not found');
    });
  });
});
