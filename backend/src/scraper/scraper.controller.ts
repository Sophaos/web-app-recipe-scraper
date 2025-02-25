import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}
  @Get('recipe')
  async getRecipe(@Query('url') url: string) {
    if (!url) {
      return { error: 'URL parameter is required' };
    }
    return await this.scraperService.scrapeRecipe(url);
  }
}
