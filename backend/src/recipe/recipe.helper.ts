import { decodeHTML } from 'entities';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';
import { RecipeDocument } from 'src/recipe/recipe.schema';
import { parseISO8601Duration } from 'src/utils/utils';
export function toRecipeDTO(recipe: RecipeDocument): RecipeDTO {
  return {
    id: recipe._id.toString(),
    name: decodeHTML(recipe.name ?? ''),
    description: decodeHTML(recipe.description ?? ''),
    ingredients: recipe.ingredients?.map((i) => decodeHTML(i)),
    ingredientsCount: recipe.ingredients?.length ?? 0,
    keywords: recipe.keywords,
    images: recipe.images,
    image: recipe.images?.[0],
    url: recipe.url,
    instructions: recipe.instructions?.map((i) => decodeHTML(i)),
    prepTime: parseISO8601Duration(recipe.prepTime ?? ''),
    cookTime: parseISO8601Duration(recipe.cookTime ?? ''),
    totalTime: parseISO8601Duration(recipe.totalTime ?? ''),
    yield: recipe.yield,
    category: recipe.category,
    cookingMethod: recipe.cookingMethod,
    cuisine: recipe.cuisine,
    rating: recipe.rating ? parseFloat(recipe.rating).toFixed(1) : 'N/A',
    ratingCount: recipe.ratingCount,
    datePublished: recipe.datePublished,
  };
}
