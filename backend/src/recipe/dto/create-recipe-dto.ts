import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRecipeDto {
  @Field()
  url: string;
}
