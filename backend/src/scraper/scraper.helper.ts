import { RecipeDetails } from 'src/recipe/dto/recipe-details.dto';
import { getString, getStringArray } from 'src/utils/object.utils';

export function extractRecipeDetails(
  recipeSchema: Record<string, unknown>,
): RecipeDetails {
  const recipeDetails: RecipeDetails = {
    name: getString(recipeSchema, 'name'),
    description: getString(recipeSchema, 'description'),
    ingredients: getStringArray(recipeSchema, 'recipeIngredient'),
    keywords: getString(recipeSchema, 'keywords'),
    image: getStringArray(recipeSchema, 'image'),
    url: getString(recipeSchema, 'url'),
    instructions: Array.isArray(recipeSchema['recipeInstructions']) // TODO: https://www.inspiredtaste.net/18982/our-favorite-easy-blueberry-muffin-recipe/
      ? (
          recipeSchema['recipeInstructions'] as (string | { text: string })[]
        ).map((i) => (typeof i === 'string' ? i : i.text))
      : undefined,
    prepTime: getString(recipeSchema, 'prepTime'),
    cookTime: getString(recipeSchema, 'cookTime'),
    totalTime: getString(recipeSchema, 'totalTime'),
    yield: getStringArray(recipeSchema, 'recipeYield'),
    category: getStringArray(recipeSchema, 'recipeCategory'),
    cookingMethod: getString(recipeSchema, 'cookingMethod'),
    cuisine: getString(recipeSchema, 'recipeCuisine'),
    rating: getString(recipeSchema, 'aggregateRating')
      ? String(recipeSchema['aggregateRating'])
      : undefined,
    ratingCount: getString(recipeSchema, 'ratingCount')
      ? String(recipeSchema['ratingCount'])
      : undefined,
    datePublished: getString(recipeSchema, 'datePublished'),
  };

  return recipeDetails;
}
