import { RecipeDocument } from 'src/schemas/recipe.schema';
import { getString, getStringArray, isObject } from 'src/utils/utils';
import { Page } from '@playwright/test';

export async function extractJsonLd(page: Page) {
  const jsonLd = await page.evaluate(() => {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (!script || !script.textContent) return null;
    const data = JSON.parse(script.textContent) as Record<string, unknown>;
    return data;
  });

  return jsonLd;
}

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
    rating:
      recipeSchema['aggregateRating'] &&
      isObject(recipeSchema['aggregateRating'])
        ? String(recipeSchema['aggregateRating']['ratingValue'])
        : 'N/A',
    ratingCount:
      recipeSchema['aggregateRating'] &&
      isObject(recipeSchema['aggregateRating'])
        ? String(recipeSchema['aggregateRating']['ratingCount'])
        : 'N/A',
    datePublished: getString(recipeSchema, 'datePublished'),
  };

  return recipeDetails;
}

function extractInstructions(recipeSchema: Record<string, unknown>): string[] {
  const rawInstructions = recipeSchema['recipeInstructions'];

  if (!rawInstructions || !Array.isArray(rawInstructions)) return [];

  return rawInstructions.flatMap((instruction) => {
    if (typeof instruction === 'string') {
      return [instruction];
    }

    if (isObject(instruction)) {
      if (
        instruction['@type'] === 'HowToSection' &&
        Array.isArray(instruction.itemListElement)
      ) {
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
        return [instruction.text];
      }
    }

    return [];
  });
}

function extractImageUrls(recipeSchema: Record<string, unknown>): string[] {
  const rawImages = recipeSchema['image'];

  if (!rawImages) return [];

  if (typeof rawImages === 'string') {
    return [rawImages];
  }

  if (Array.isArray(rawImages)) {
    return rawImages
      .map((img) =>
        typeof img === 'string'
          ? img
          : isObject(img) && typeof img.url === 'string'
            ? img.url
            : null,
      )
      .filter((url): url is string => !!url);
  }

  if (isObject(rawImages) && typeof rawImages.url === 'string') {
    return [rawImages.url];
  }

  return [];
}
