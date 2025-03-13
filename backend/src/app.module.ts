import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperService } from './scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';

@Module({
  // imports: [RecipeModule],
  // imports: [RecipeModule, MongooseModule.forRoot('mongodb://localhost/nest')],
  imports: [
    RecipeModule,
    MongooseModule.forRoot(
      // 'mongodb://root:mysecretpassword@db:27017/recipe_db?authSource=admin',
      'mongodb://localhost:27017/recipe_db',
    ),
  ],
  controllers: [AppController, RecipeController],
  providers: [AppService, ScraperService, RecipeService],
})
export class AppModule {}
