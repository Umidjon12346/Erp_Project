import { InputType, Field, Int, PartialType } from "@nestjs/graphql";
import { CreateTeacherGroupDto } from "./create-teachergroup.dto";

@InputType()
export class UpdateTeacherGroupDto extends PartialType(CreateTeacherGroupDto) {

}
