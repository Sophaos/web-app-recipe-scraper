import { RecipeDocument } from 'src/schemas/recipe.schema';
import { getString, getStringArray, isObject } from 'src/utils/object.utils';

export function extractRecipeDetails(
  recipeSchema: Record<string, unknown>,
  url: string,
): Partial<RecipeDocument> {
  const recipeDetails: Partial<RecipeDocument> = {
    name: getString(recipeSchema, 'name'),
    description: getString(recipeSchema, 'description'),
    ingredients: getStringArray(recipeSchema, 'recipeIngredient'),
    keywords: getString(recipeSchema, 'keywords'),
    images: extractImageUrls(recipeSchema),
    url,
    instructions: extractInstructions(recipeSchema),
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

function extractInstructions(recipeSchema: Record<string, unknown>): string[] {
  const rawInstructions = recipeSchema['recipeInstructions'];

  if (!rawInstructions || !Array.isArray(rawInstructions)) return [];

  return rawInstructions.flatMap((instruction) => {
    if (typeof instruction === 'string') {
      return [instruction]; // Case 1: Direct string instructions
    }

    if (isObject(instruction)) {
      if (
        instruction['@type'] === 'HowToSection' &&
        Array.isArray(instruction.itemListElement)
      ) {
        // Case 2: HowToSection → Extract from itemListElement (only HowToStep)
        return instruction.itemListElement
          .filter(
            (step): step is { text: string } =>
              isObject(step) &&
              step['@type'] === 'HowToStep' &&
              typeof step.text === 'string',
          )
          .map((step) => step.text);
      }

      if (
        instruction['@type'] === 'HowToStep' &&
        typeof instruction.text === 'string'
      ) {
        return [instruction.text]; // Case 3: Direct HowToStep object with text
      }
    }

    return []; // Ignore unknown structures
  });
}

function extractImageUrls(recipeSchema: Record<string, unknown>): string[] {
  const rawImages = recipeSchema['image'];

  if (!rawImages) return [];

  if (typeof rawImages === 'string') {
    return [rawImages]; // ✅ Case 1: Direct string URL
  }

  if (Array.isArray(rawImages)) {
    return rawImages
      .map((img) =>
        typeof img === 'string'
          ? img // ✅ Case 2: Array of string URLs
          : isObject(img) && typeof img.url === 'string'
            ? img.url // ✅ Case 3: Array of ImageObject(s)
            : null,
      )
      .filter((url): url is string => !!url);
  }

  if (isObject(rawImages) && typeof rawImages.url === 'string') {
    return [rawImages.url]; // ✅ Case 4: Single ImageObject
  }

  return []; // ❌ Unrecognized format
}
