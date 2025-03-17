import { Injectable } from '@nestjs/common';
import { chromium } from '@playwright/test';
import { extractJsonLd, extractSchema } from 'src/utils/jsonld.utils';
import { extractRecipeDetails } from './scraper.helper';
import { RecipeDTO } from 'src/models/recipe-dto';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe-dto';

@Injectable()
export class ScraperService {
  async scrapeRecipe(
    createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDTO | null> {
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
        return extractRecipeDetails(recipeSchema);
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
