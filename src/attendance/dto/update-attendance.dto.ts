import { Field, InputType, Int } from "@nestjs/graphql";
import { Student } from "../../student/entities/student.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";

@InputType()
export class UpdateAttendanceDto {
  @Field((type) => Int, { nullable: true })
  student_id?: Student;

  @Field((type) => Int, { nullable: true })
  schudule_id?: Schedule;

  @Field()
  date?: string;

  @Field()
  status?: string;
}
