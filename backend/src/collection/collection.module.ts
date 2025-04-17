import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from 'src/collection/collection.schema';
import { RecipeService } from 'src/recipe/recipe.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
  providers: [CollectionService, RecipeService],
})
export class CollectionModule {}
