import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

export type RecipeDocument = HydratedDocument<Recipe>;

@Schema()
@ObjectType()
export class Recipe {
  @Field(() => ID)
  _id: string;

  @Prop()
  @Field({ nullable: true })
  name?: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  ingredients?: string[];

  @Prop()
  @Field({ nullable: true })
  keywords?: string;

  @Prop({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  images?: string[];

  @Prop()
  @Field({ nullable: true })
  url?: string;

  @Prop({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  instructions?: string[];

  @Prop()
  @Field({ nullable: true })
  prepTime?: string;

  @Prop()
  @Field({ nullable: true })
  cookTime?: string;

  @Prop()
  @Field({ nullable: true })
  totalTime?: string;

  @Prop({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  yield?: string[];

  @Prop({ type: [String] })
  @Field(() => [String], { nullable: 'itemsAndList' })
  category?: string[];

  @Prop()
  @Field({ nullable: true })
  cookingMethod?: string;

  @Prop()
  @Field({ nullable: true })
  cuisine?: string;

  @Prop()
  @Field({ nullable: true })
  rating?: string;

  @Prop()
  @Field({ nullable: true })
  ratingCount?: string;

  @Prop()
  @Field({ nullable: true })
  datePublished?: string;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
