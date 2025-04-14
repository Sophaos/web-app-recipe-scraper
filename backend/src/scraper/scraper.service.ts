import { Injectable, BadRequestException } from '@nestjs/common';
import { chromium } from '@playwright/test';
import { extractSchema } from 'src/utils/utils';
import { extractJsonLd, extractRecipeDetails } from './scraper.helper';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe-dto';
import { RecipeDocument } from 'src/recipe/recipe.schema';

@Injectable()
export class ScraperService {
  async scrapeRecipe(
    createRecipeDto: CreateRecipeDto,
  ): Promise<Partial<RecipeDocument>> {
    if (!createRecipeDto.url) {
      throw new BadRequestException('URL is required to scrape recipe');
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

      throw new BadRequestException('Invalid recipe schema format');
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error; // rethrow custom error
      }
      console.error('Scraping failed:', error);
      throw new BadRequestException('Failed to scrape recipe');
    } finally {
      await browser.close();
    }
  }
}
