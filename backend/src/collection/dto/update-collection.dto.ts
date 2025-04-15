import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCollectionDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;
}
