import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "../../student/entities/student.entity";
import { Homework } from "../../homework/entities/homework.entity";
import { Grade } from "../../grades/entities/grade.entity";
import { Media } from "../../media/entities/media.entity";

@ObjectType()
@Entity()
export class Homeworksubmission {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    (type) => Homework,
    (homework_id) => homework_id.homeworksubmission
  )
  @Field((type) => Homework)
  homework_id: Homework;

  @ManyToOne((type) => Student, (student_id) => student_id)
  @Field((type) => Student)
  student_id: Student;

  @Field()
  @Column()
  submitted_at: string;

  @Field()
  @Column()
  file_url: string;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column()
  status: string;

  @OneToMany((type) => Grade, (grade) => grade.homeworksub_id)
  @Field((type) => [Grade])
  grade: Grade[];

  @OneToMany((type) => Media, (media) => media.homeworksub_id)
  @Field((type) => [Media])
  media: Media[];
}
