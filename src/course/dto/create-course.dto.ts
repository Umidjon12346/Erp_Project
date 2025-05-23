import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateCourseDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  price: string;

  @Field()
  duration: number;

  @Field()
  lessonsinweel: number;

  @Field()
  lessonduration: number;

  
}
