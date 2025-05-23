import { PartialType } from "@nestjs/graphql";
import { CreateStudentDto } from "./create-student.dto";
import { InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
