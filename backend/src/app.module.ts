import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperController } from './scraper/scraper.controller';
import { ScraperService } from './scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';

@Module({
  imports: [RecipeModule],
  // imports: [RecipeModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  controllers: [AppController, RecipeController],
  providers: [AppService, ScraperService, RecipeService],
})
export class AppModule {}
