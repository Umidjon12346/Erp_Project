import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateHomeworkDto {
  @Field()
  description: string;

  @Field()
  deadline: string;

  @Field()
  file_url: string;
}
