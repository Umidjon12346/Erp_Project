import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Homework } from "../../homework/entities/homework.entity";
import { Homeworksubmission } from "../../homework_submission/entities/homework_submission.entity";

@ObjectType()
@Entity()
export class Media {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Homework, (homework_id) => homework_id.media)
  @Field((type) => Homework)
  homework_id: Homework;

  @ManyToOne(
    (type) => Homeworksubmission,
    (homeworksub_id) => homeworksub_id.media
  )
  @Field((type) => Homeworksubmission)
  homeworksub_id: Homeworksubmission;

  @Field()
  @Column()
  file: string;

  @Field()
  @Column()
  type: string;

  @Field()
  @Column()
  file_name: string;

  @Field()
  @Column()
  size: string;
}
