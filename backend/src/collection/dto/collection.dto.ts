import { ObjectType, Field, ID } from '@nestjs/graphql';
import { RecipeDTO } from 'src/recipe/dto/recipe.dto';

@ObjectType()
export class CollectionDTO {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [RecipeDTO], { nullable: 'itemsAndList' })
  recipes?: RecipeDTO[];
}
