import { CollectionAggregate } from 'src/collection/aggregations/collection-aggregate';
import { PartialCollectionDTO } from 'src/collection/dto/partial-collection.dto';
export function toPartialCollectionDTO(
  collection: CollectionAggregate,
): PartialCollectionDTO {
  return {
    id: collection._id.toString(),
    name: collection.name,
    recipeCount: collection.recipeCount,
    previewImage: collection.previewImage,
  };
}
