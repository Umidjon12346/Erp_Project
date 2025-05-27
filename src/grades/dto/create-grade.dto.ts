import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateGradeDto {
  @Field()
  grade: number;

  @Field()
  date: string;

  @Field()
  comment: string;
}
