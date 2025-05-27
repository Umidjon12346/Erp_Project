import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateHomeworksubmissionDto {
  @Field()
  submitted_at: string;

  @Field()
  file_url: string;

  @Field()
  comment: string;

  @Field()
  status: string;
}
