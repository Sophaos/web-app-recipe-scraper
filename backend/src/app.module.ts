import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { ScraperService } from './scraper/scraper.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RecipeService } from './recipe/recipe.service';
import { Recipe, RecipeSchema } from './recipe/recipe.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RecipeResolver } from './recipe/recipe.resolver';

const isDocker = process.env.DOCKER === 'true';
const mongoUri = isDocker
  ? 'mongodb://root:mysecretpassword@db:27017/recipe_db?authSource=admin'
  : 'mongodb://root:mysecretpassword@localhost:27017/recipe_db?authSource=admin';

@Module({
  imports: [
    RecipeModule,
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([{ name: Recipe.name, schema: RecipeSchema }]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true, // Optional, keeps schema organized
    }),
  ],
  providers: [ScraperService, RecipeService, RecipeResolver],
})
export class AppModule {}
