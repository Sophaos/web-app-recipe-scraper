import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class PartialCollectionDTO {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  recipeCount: number;

  @Field({ nullable: true })
  previewImage?: string;
}
