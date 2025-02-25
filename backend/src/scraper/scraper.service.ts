import { Injectable } from '@nestjs/common';
import { chromium } from '@playwright/test';

interface RecipeDetails {
  name?: string;
  description?: string;
  ingredients?: string[];
  keywords?: string;
  image?: string[];
  url?: string;
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  yield?: string[];
  category?: string[];
  cookingMethod?: string;
  cuisine?: string;
  rating?: string;
  ratingCount?: string;
  datePublished?: string;
  // nutrition
  // [key: string]: string;
}
@Injectable()
export class ScraperService {
  async scrapeRecipe(url: string): Promise<any> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const jsonLd = await page.evaluate(() => {
        const script = document.querySelector(
          'script[type="application/ld+json"]',
        );
        if (!script || !script.textContent) return null;
        const data = JSON.parse(script.textContent) as Record<string, unknown>;
        return data;
      });

      if (!jsonLd) return null;

      // Type guard to check if value is a non-null object
      const isObject = (value: unknown): value is Record<string, unknown> =>
        typeof value === 'object' && value !== null;

      if (Array.isArray(jsonLd)) {
        return (
          jsonLd.find(
            (item): item is Record<string, unknown> =>
              isObject(item) &&
              typeof item['@type'] === 'string' &&
              item['@type'] === 'Recipe',
          ) ?? null
        );
      }

      if (isObject(jsonLd)) {
        // If @graph exists, search inside it
        if (Array.isArray(jsonLd['@graph'])) {
          return (
            jsonLd['@graph'].find(
              (item): item is Record<string, unknown> =>
                isObject(item) &&
                typeof item['@type'] === 'string' &&
                item['@type'] === 'Recipe',
            ) ?? null
          );
        }

        // If jsonLd itself is a Recipe
        if (
          typeof jsonLd['@type'] === 'string' &&
          jsonLd['@type'] === 'Recipe'
        ) {
          return jsonLd;
        }
      }

      console.log('nothing');
      return null;
    } catch (error) {
      console.error('Scraping failed:', error);
      return '';
    } finally {
      await browser.close();
    }
  }
}
