import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCollectionDto {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: 'itemsAndList' })
  recipeIds?: string[];
}
