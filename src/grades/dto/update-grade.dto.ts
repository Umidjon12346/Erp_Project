import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateGradeDto {
  @Field()
  grade?: number;

  @Field()
  date?: string;

  @Field()
  comment?: string;
}
