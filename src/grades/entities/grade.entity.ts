import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Student } from "../../student/entities/student.entity";
import { Homeworksubmission } from "../../homework_submission/entities/homework_submission.entity";

@ObjectType()
@Entity()
export class Grade {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Teacher, (teacher_id) => teacher_id)
  @Field((type) => Teacher)
  teacher_id: Teacher;

  @ManyToOne((type) => Student, (student_id) => student_id)
  @Field((type) => Student)
  student_id: Student;

  @ManyToOne(
    (type) => Homeworksubmission,
    (homeworksub_id) => homeworksub_id.grade
  )
  @Field((type) => Homeworksubmission)
  homeworksub_id: Homeworksubmission;

  @Field()
  @Column()
  grade: number;

  @Field()
  @Column()
  date: string;

  @Field()
  @Column()
  comment: string;
}
