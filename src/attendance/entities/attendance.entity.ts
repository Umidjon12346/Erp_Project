import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Schedule } from "../../schedule/entities/schedule.entity";

@ObjectType()
@Entity()
export class Attendance {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Student, (student_id) => student_id.attendance)
  @Field((type) => Student)
  student_id: Student;

  @ManyToOne((type) => Schedule, (schudule_id) => schudule_id.attendance)
  @Field((type) => Schedule)
  schudule_id: Schedule;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  status: string;
}
