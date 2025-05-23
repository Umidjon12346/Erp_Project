import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { AttendancesService } from "./attendance.service";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { Attendance } from "./entities/attendance.entity";

@Resolver(() => Attendance)
export class AttendancesResolver {
  constructor(private readonly attendancesService: AttendancesService) {}

  @Mutation(() => Attendance)
  createAttendance(
    @Args("createAttendance") createAttendanceDto: CreateAttendanceDto
  ) {
    return this.attendancesService.create(createAttendanceDto);
  }

  @Query(() => [Attendance])
  findAllAttendances() {
    return this.attendancesService.findAll();
  }

  @Query(() => Attendance)
  findOneAttendance(@Args("id", { type: () => ID }) id: number) {
    return this.attendancesService.findOne(id);
  }

  @Mutation(() => Attendance)
  updateAttendance(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateAttendance") updateAttendanceDto: UpdateAttendanceDto
  ) {
    return this.attendancesService.update(id, updateAttendanceDto);
  }

  @Mutation(() => Number)
  removeAttendance(@Args("id", { type: () => ID }) id: number) {
    return this.attendancesService.remove(id);
  }
}
