import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetCollectionDto {
  @Field()
  id: string;
}
