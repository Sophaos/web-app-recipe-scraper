import { CollectionDTO } from 'src/collection/dto/collection.dto';
import { CollectionDocument } from 'src/collection/collection.schema';
export function toCollectionDTO(collection: CollectionDocument): CollectionDTO {
  return {
    id: collection._id.toString(),
    name: collection.name,
    description: collection.description,
    recipes: collection.recipes,
  };
}
