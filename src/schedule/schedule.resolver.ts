import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./entities/schedule.entity";

@Resolver(() => Schedule)
export class SchedulesResolver {
  constructor(private readonly schedulesService: ScheduleService) {}

  @Mutation(() => Schedule)
  createSchedule(@Args("createSchedule") createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.create(createScheduleDto);
  }

  @Query(() => [Schedule])
  findAllSchedules() {
    return this.schedulesService.findAll();
  }

  @Query(() => Schedule)
  findOneSchedule(@Args("id", { type: () => ID }) id: number) {
    return this.schedulesService.findOne(id);
  }

  @Mutation(() => Schedule)
  updateSchedule(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateSchedule") updateScheduleDto: UpdateScheduleDto
  ) {
    return this.schedulesService.update(id, updateScheduleDto);
  }

  @Mutation(() => Number)
  removeSchedule(@Args("id", { type: () => ID }) id: number) {
    return this.schedulesService.remove(id);
  }
}
