import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { ScraperService } from 'src/scraper/scraper.service';

@Module({
  controllers: [RecipeController],
  providers: [RecipeService, ScraperService],
})
export class RecipeModule {}
