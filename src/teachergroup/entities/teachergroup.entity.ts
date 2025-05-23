import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
@Entity()
export class TeacherGroup {
  @ManyToOne((type) => Teacher, (teacher) => teacher.teachergroup)
  @Field((type) => TeacherGroup)
  @PrimaryColumn()
  teacher_id: number;

  @ManyToOne((type) => Group, (group_id) => group_id.teachergroup)
  @Field((type) => TeacherGroup)
  @PrimaryColumn()
  group_id: number;
}
