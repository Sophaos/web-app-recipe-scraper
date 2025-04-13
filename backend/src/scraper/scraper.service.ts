import { Injectable } from '@nestjs/common';
import { chromium } from '@playwright/test';
import { extractSchema } from 'src/utils/utils';
import { extractJsonLd, extractRecipeDetails } from './scraper.helper';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe-dto';
import { RecipeDocument } from 'src/schemas/recipe.schema';

@Injectable()
export class ScraperService {
  async scrapeRecipe(
    createRecipeDto: CreateRecipeDto,
  ): Promise<Partial<RecipeDocument> | null> {
    if (!createRecipeDto.url) {
      return null;
    }
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(createRecipeDto.url, { waitUntil: 'domcontentloaded' });
      const jsonLd = await extractJsonLd(page);
      const recipeSchema = extractSchema(jsonLd, 'Recipe');
      if (recipeSchema) {
        return extractRecipeDetails(recipeSchema, createRecipeDto.url);
      }
      console.log('invalid format');
      return null;
    } catch (error) {
      console.error('Scraping failed:', error);
      return null;
    } finally {
      await browser.close();
    }
  }
}
