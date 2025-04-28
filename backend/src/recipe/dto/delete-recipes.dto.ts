import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteRecipesDto {
  @Field(() => [String])
  ids: string[];
}
