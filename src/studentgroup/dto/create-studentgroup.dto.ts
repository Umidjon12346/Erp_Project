import { Field, InputType, Int } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";
import { Group } from "../../group/entities/group.entity";

@InputType()
export class CreateStudentgroupDto {
  @Field((type) => Int, { nullable: true })
  student_id: Student;

  @Field((type) => Int, { nullable: true })
  group_id: Group;

  @Field()
  period: string;

  @Field()
  is_active: boolean;
}
