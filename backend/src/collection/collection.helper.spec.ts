import { toCollectionDTO } from './collection.helper';
import { CollectionDocument } from './collection.schema';
import { COLLECTION_DAO_MOCK } from './mocks/collection-dao.mock';

describe('toCollectionDTO', () => {
  it('should properly convert a recipe document to a DTO', () => {
    const result = toCollectionDTO(COLLECTION_DAO_MOCK as CollectionDocument);
    expect(result.name).toEqual(COLLECTION_DAO_MOCK.name);
    expect(result.description).toEqual(COLLECTION_DAO_MOCK.description);
  });
});
