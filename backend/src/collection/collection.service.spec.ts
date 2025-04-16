import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collection/collection.schema';
import mongoose, { Connection, Model } from 'mongoose';
import {
  MongoDBContainer,
  StartedMongoDBContainer,
} from '@testcontainers/mongodb';
import { ConflictException } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { COLLECTION_DTO_MOCK } from './mocks/collection-dto.mock';

describe('CollectionService', () => {
  jest.setTimeout(60000);
  let service: CollectionService;
  let mongoContainer: StartedMongoDBContainer;
  let collectionModel: Model<Collection>;
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
        {
          provide: getModelToken(Collection.name),
          useValue: dbConnection.model(Collection.name, CollectionSchema),
        },
      ],
    }).compile();

    service = module.get<CollectionService>(CollectionService);
    collectionModel = module.get<Model<Collection>>(
      getModelToken(Collection.name),
    );
  });

  afterEach(async () => {
    await collectionModel.deleteMany({});
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

      const found = await collectionModel.findById(created.id);
      expect(found).not.toBeNull();
      expect(found?.name).toEqual(collectionWithoutId.name);
    });

    it('should not create a collection and fail if it already exists', async () => {
      await collectionModel.insertOne(COLLECTIONS_DOCUMENT_MOCK[0]);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id: _, ...collectionWithoutId } = COLLECTION_DTO_MOCK;
      await expect(service.create(collectionWithoutId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll()', () => {
    it('should return all collections, filtered by search term if provided', async () => {
      await collectionModel.insertMany(COLLECTIONS_DOCUMENT_MOCK);

      const all = await service.findAll();
      expect(all).toHaveLength(12);

      const filtered = await service.findAll('Pico de Gallo');
      expect(filtered).toHaveLength(1);
      expect(filtered[0].ingredients?.length).toEqual(6);
    });
  });

  describe('findOne()', () => {
    it('should return a collection by ID', async () => {
      const doc = await collectionModel.insertOne(COLLECTIONS_DOCUMENT_MOCK[0]);

      const found = await service.findOne(doc._id.toString());
      expect(found.name).toBe(COLLECTIONS_DOCUMENT_MOCK[0].name);
    });

    it('should throw NotFoundException if ID not found', async () => {
      await expect(
        service.findOne(new mongoose.Types.ObjectId().toString()),
      ).rejects.toThrow('not found');
    });
  });

  describe('remove()', () => {
    it('should delete and return the deleted collection', async () => {
      const doc = await collectionModel.insertOne(COLLECTIONS_DOCUMENT_MOCK[0]);

      const deleted = await service.remove({ id: doc._id.toString() });
      expect(deleted.name).toBe(COLLECTIONS_DOCUMENT_MOCK[0].name);

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
