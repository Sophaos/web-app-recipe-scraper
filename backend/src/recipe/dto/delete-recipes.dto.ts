import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteRecipesDto {
  @Field()
  ids: string[];
}
