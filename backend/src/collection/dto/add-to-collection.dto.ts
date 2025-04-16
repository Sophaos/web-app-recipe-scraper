import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AddToCollectionDto {
  @Field()
  id: string;

  @Field()
  recipeId: string;
}
