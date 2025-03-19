import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperService } from './scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe/recipe.service';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipeResolver } from './recipe/recipe.resolver';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(
      'mongodb://root:mysecretpassword@localhost:27017/recipe_db?authSource=admin',
    ),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true, // Optional, keeps schema organized
    }),
  ],
  providers: [AppService, ScraperService, RecipeService, RecipeResolver],
})
export class AppModule {}
