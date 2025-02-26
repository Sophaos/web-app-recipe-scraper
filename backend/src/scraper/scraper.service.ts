import { Injectable } from '@nestjs/common';
import { chromium } from '@playwright/test';
import { extractJsonLd, extractSchema } from 'src/utils/jsonld.utils';
import { extractRecipeDetails } from './scraper.helper';
import { RecipeDetails } from 'src/recipe/dto/recipe-details.dto';

@Injectable()
export class ScraperService {
  async scrapeRecipe(url: string): Promise<RecipeDetails | null> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const jsonLd = await extractJsonLd(page);
      const recipeSchema = extractSchema(jsonLd, 'Recipe');
      if (recipeSchema) {
        return extractRecipeDetails(recipeSchema);
      }
      return null;
    } catch (error) {
      console.error('Scraping failed:', error);
      return null;
    } finally {
      await browser.close();
    }
  }
}
