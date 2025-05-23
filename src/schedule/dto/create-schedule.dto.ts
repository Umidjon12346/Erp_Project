import { Field, InputType, Int } from "@nestjs/graphql";
import { Group } from "../../group/entities/group.entity";

@InputType()
export class CreateScheduleDto {
  @Field()
  day_of_week: string;

  @Field((type) => Int, { nullable: true })
  group_id: Group;

  @Field()
  start_time: string;

  @Field()
  end_time: string;
}
