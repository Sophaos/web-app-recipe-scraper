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
  async scrapeRecipe(url: string): Promise<string> {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const jsonLd: string = await page.evaluate(() => {
        const script: HTMLScriptElement | null = document.querySelector(
          'script[type="application/ld+json"]',
        );

        if (script === null) {
          return '';
        }
        const data = script.innerHTML;

        return data;
      });

      return jsonLd;
    } catch (error) {
      console.error('Scraping failed:', error);
      return '';
    } finally {
      await browser.close();
    }
  }
}
