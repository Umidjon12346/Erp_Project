import { Module } from "@nestjs/common";
import { AttendancesService } from "./attendance.service";
import { AttendanceController } from "./attendance.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "../student/entities/student.entity";
import { Schedule } from "../schedule/entities/schedule.entity";
import { AttendancesResolver } from "./attendance.resolver";
import { Attendance } from "./entities/attendance.entity";
import { StudentModule } from "../student/student.module";
import { ScheduleModule } from "../schedule/schedule.module";

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]),StudentModule,ScheduleModule],
  controllers: [AttendanceController],
  providers: [AttendancesService, AttendancesResolver],
})
export class AttendancesModule {}
