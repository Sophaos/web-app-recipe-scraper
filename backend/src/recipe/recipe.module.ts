import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { ScraperService } from 'src/scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from 'src/recipe/recipe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  providers: [RecipeService, ScraperService],
})
export class RecipeModule {}
