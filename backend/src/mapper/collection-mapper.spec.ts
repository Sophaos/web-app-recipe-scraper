import { COLLECTION_DAO_MOCK } from 'src/collection/mocks/collection-dao.mock';
import { toCollectionDTO, toPartialCollectionDTO } from './collection-mapper';
import { CollectionDocument } from 'src/collection/collection.schema';
import { CollectionAggregate } from 'src/collection/aggregations/collection-aggregate';

describe('collection mapper', () => {
  describe('toCollectionDTO', () => {
    it('should properly convert a recipe document to a DTO', () => {
      const result = toCollectionDTO(COLLECTION_DAO_MOCK as CollectionDocument);
      expect(result.name).toEqual(COLLECTION_DAO_MOCK.name);
      expect(result.description).toEqual(COLLECTION_DAO_MOCK.description);
    });
  });

  describe('toPartialCollectionDTO', () => {
    it('should properly convert a recipe document to a DTO', () => {
      const mock: CollectionAggregate = {
        _id: '1',
        name: 'test',
        recipeCount: 3,
        previewImage: 'test',
      };

      const result = toPartialCollectionDTO(mock);
      expect(result.name).toEqual(mock.name);
      expect(result.id).toEqual(mock._id);
      expect(result.recipeCount).toEqual(mock.recipeCount);
      expect(result.previewImage).toEqual(mock.previewImage);
    });
  });
});
