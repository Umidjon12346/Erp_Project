import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "../../course/entities/course.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";
import { TeacherGroup } from "../../teachergroup/entities/teachergroup.entity";
import { StudentGroup } from "../../studentgroup/entities/studentgroup.entity";

@ObjectType()
@Entity()
export class Group {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @ManyToOne((type) => Course, (course_id) => course_id.group)
  @Field((type) => Course)
  course_id: Course;

  @Field()
  @CreateDateColumn()
  start_date: string;

  @Field()
  @CreateDateColumn()
  end_date: string;

  @Field()
  @Column()
  status: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.group_id)
  @Field((type) => [Schedule])
  schedule: Schedule[];

  @OneToMany((type) => TeacherGroup, (teachergroup) => teachergroup.group_id)
  @Field((type) => [TeacherGroup])
  teachergroup: TeacherGroup[];

  @OneToMany((type) => StudentGroup, (studentgroup) => studentgroup.group_id)
  @Field((type) => [StudentGroup])
  studentgroup: StudentGroup[];
}
