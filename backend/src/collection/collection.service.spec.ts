import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collection/collection.schema';
import mongoose, { Connection, Model } from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
// import { ConflictException } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { COLLECTION_DTO_MOCK } from './mocks/collection-dto.mock';
import { COLLECTION_DAO_LIST_WITHOUT_ID_MOCK } from './mocks/collection-dao.mock';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Recipe, RecipeSchema } from 'src/recipe/recipe.schema';
import { RECIPES_DOCUMENT_MOCK } from 'src/recipe/mocks/recipes-document.mock';
import { RecipeService } from 'src/recipe/recipe.service';
import { AddToCollectionDto } from './dto/add-to-collection.dto';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...collectionWithoutId } = COLLECTION_DTO_MOCK;
      const created = await service.create(collectionWithoutId);
      expect(created).toBeDefined();
      expect(created.id).toBeDefined();
      expect(created.name).toEqual(collectionWithoutId.name);

      const found = await collectionModel.findById(created.id).lean();
      expect(found).not.toBeNull();
      expect(found?.name).toEqual(collectionWithoutId.name);
    });
  });

  describe('findAll()', () => {
    it('should return all collections', async () => {
      await collectionModel.insertMany(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK);

      const all = await service.findAll();
      expect(all).toHaveLength(COLLECTION_DAO_LIST_WITHOUT_ID_MOCK.length);
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

  describe('updateOne()', () => {
    it('should return a collection by ID', async () => {
      const inserted = await collectionModel.insertMany(
        COLLECTION_DAO_LIST_WITHOUT_ID_MOCK,
      );

      const idToUpdate = inserted[0]._id.toString();
      const collectionDTO: UpdateCollectionDto = {
        id: idToUpdate,
        name: 'test',
        description: 'updated description',
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
      };
      await expect(service.updateCollection(collectionDTO)).rejects.toThrow(
        'not found',
      );
    });
  });

  describe('addToCollection()', () => {
    it('should return a collection with a new recipe inside it', async () => {
      const insertedCollections = await collectionModel.insertMany(
        COLLECTION_DAO_LIST_WITHOUT_ID_MOCK,
      );
      const insertedRecipes = await recipeModel.insertMany(
        RECIPES_DOCUMENT_MOCK,
      );

      const collectionDTO: AddToCollectionDto = {
        id: insertedCollections[0]._id.toString(),
        recipeId: insertedRecipes[0]._id.toString(),
      };

      const found = await service.addToCollection(collectionDTO);
      expect(found.recipes).toHaveLength(1);
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
