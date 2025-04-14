import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteRecipeDto {
  @Field()
  id: string;
}
