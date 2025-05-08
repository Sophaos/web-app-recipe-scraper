import { CollectionAggregate } from 'src/collection/aggregations/collection-aggregate';
import { PartialCollectionDTO } from 'src/collection/dto/partial-collection.dto';
import { CollectionDTO } from 'src/collection/dto/collection.dto';
import { Collection } from 'src/collection/collection.schema';
import { toRecipeDTO } from './recipe-mapper';

export function toCollectionDTO(collection: Collection): CollectionDTO {
  return {
    id: collection._id.toString(),
    name: collection.name,
    description: collection.description,
    recipes: collection.recipes?.map((r) => toRecipeDTO(r)),
  };
}

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
