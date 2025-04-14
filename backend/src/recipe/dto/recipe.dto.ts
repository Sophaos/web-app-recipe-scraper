import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class RecipeDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  ingredients?: string[];

  @Field(() => Int, { nullable: true })
  ingredientsCount?: number;

  @Field({ nullable: true })
  keywords?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  images?: string[];

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  url?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  instructions?: string[];

  @Field({ nullable: true })
  prepTime?: string;

  @Field({ nullable: true })
  cookTime?: string;

  @Field({ nullable: true })
  totalTime?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  yield?: string[];

  @Field(() => [String], { nullable: 'itemsAndList' })
  category?: string[];

  @Field({ nullable: true })
  cookingMethod?: string;

  @Field({ nullable: true })
  cuisine?: string;

  @Field({ nullable: true })
  rating?: string;

  @Field({ nullable: true })
  ratingCount?: string;

  @Field({ nullable: true })
  datePublished?: string;
}
