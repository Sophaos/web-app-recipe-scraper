import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeleteCollectionDto {
  @Field()
  id: string;
}
