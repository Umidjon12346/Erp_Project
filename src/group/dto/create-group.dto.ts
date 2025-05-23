import { Field, InputType, Int } from "@nestjs/graphql";
import { Course } from "../../course/entities/course.entity";

@InputType()
export class CreateGroupDto {
  @Field()
  name: string;

  @Field((type) => Int, { nullable: true })
  course_id: Course;

  @Field()
  start_date: string;

  @Field()
  end_date: string;

  @Field()
  status: string;
}
