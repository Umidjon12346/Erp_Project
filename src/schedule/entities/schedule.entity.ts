import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Attendance } from "../../attendance/entities/attendance.entity";

@ObjectType()
@Entity()
export class Schedule {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  day_of_week: string;

  @ManyToOne((type) => Group, (group_id) => group_id.schedule)
  @Field((type) => Group)
  group_id: Group;

  @Field()
  @CreateDateColumn()
  start_time: string;

  @Field()
  @CreateDateColumn()
  end_time: string;

  @OneToMany((type) => Attendance, (attendance) => attendance.student_id)
  @Field((type) => [Attendance])
  attendance: Attendance[];
}
