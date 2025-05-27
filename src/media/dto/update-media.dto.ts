import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateMediaDto {
  @Field()
  file: string;

  @Field()
  type: string;

  @Field()
  file_name: string;

  @Field()
  size: string;
}
