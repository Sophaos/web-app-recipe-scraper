import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';

@ObjectType()
export class DefaultCollectionDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => Int)
  recipeCount: number;

  @Field(() => [RecipeDTO], { nullable: true })
  recipes?: RecipeDTO[];
}
