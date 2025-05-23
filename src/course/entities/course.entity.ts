import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";

@ObjectType()
@Entity()
export class Course {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  price: string;

  @Field()
  @Column()
  duration: number;

  @Field()
  @Column()
  lessonsinweel: number;

  @Field()
  @Column()
  lessonduration: number;

  @OneToMany((type) => Group, (group) => group.course_id)
  @Field((type) => [Group])
  group: Group[];
}
