import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Recipe, RecipeSchema } from 'src/recipe/recipe.schema';

export type CollectionDocument = HydratedDocument<Collection>;

@Schema()
@ObjectType()
export class Collection {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field({ nullable: true })
  name: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ type: [RecipeSchema] })
  @Field(() => [Recipe])
  recipes: Recipe[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
