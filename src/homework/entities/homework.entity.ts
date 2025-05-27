import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { Group } from "../../group/entities/group.entity";
import { Homeworksubmission } from "../../homework_submission/entities/homework_submission.entity";
import { Media } from "../../media/entities/media.entity";

@ObjectType()
@Entity()
export class Homework {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Teacher, (teacher_id) => teacher_id)
  @Field((type) => Teacher)
  teacher_id: Teacher;

  @ManyToOne((type) => Group, (group_id) => group_id)
  @Field((type) => Group)
  group_id: Group;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  deadline: string;

  @Field()
  @Column()
  file_url: string;

  @OneToMany(
    (type) => Homeworksubmission,
    (homeworksubmission) => homeworksubmission.homework_id
  )
  @Field((type) => [Homeworksubmission])
  homeworksubmission: Homeworksubmission[];

  @OneToMany((type) => Media, (media) => media.homework_id)
  @Field((type) => [Media])
  media: Media[];
}
