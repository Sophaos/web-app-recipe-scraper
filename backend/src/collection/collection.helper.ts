import { CollectionDTO } from 'src/collection/dto/collection.dto';
import { Collection } from 'src/collection/collection.schema';
import { toRecipeDTO } from 'src/recipe/recipe.helper';
export function toCollectionDTO(collection: Collection): CollectionDTO {
  return {
    id: collection._id.toString(),
    name: collection.name,
    description: collection.description,
    recipes: collection.recipes?.map((r) => toRecipeDTO(r)),
  };
}
