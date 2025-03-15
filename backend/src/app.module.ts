import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperService } from './scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe/recipe.service';
import { RecipeController } from './recipe/recipe.controller';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(
      // 'mongodb://root:mysecretpassword@db:27017/recipe_db?authSource=admin',
      'mongodb://localhost:27017/recipe_db',
    ),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
  ],
  controllers: [AppController, RecipeController],
  providers: [AppService, ScraperService, RecipeService],
})
export class AppModule {}
