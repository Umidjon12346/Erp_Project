import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateMediaDto {
  @Field()
  file: string;

  @Field()
  type: string;

  @Field()
  file_name: string;

  @Field()
  size: string;
}
