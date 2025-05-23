import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CreateTeacherGroupDto {
  @Field(() => Int)
  teacherId: number;

  @Field(() => Int)
  groupId: number;
}
