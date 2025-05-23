import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "../../group/entities/group.entity";
import { Student } from "../../student/entities/student.entity";

@ObjectType()
@Entity()
export class StudentGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.studentgroup)
  @Field(() => Student)
  student_id: Student;

  @ManyToOne(() => Group, (group) => group.studentgroup)
  @Field(() => Group)
  group_id: Group;

  @Field()
  @Column()
  period: string;

  @Field()
  @Column({ default: true })
  is_active: boolean;
}
