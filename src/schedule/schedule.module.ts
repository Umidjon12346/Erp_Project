import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Attendance } from '../attendance/entities/attendance.entity';
import { AttendancesModule } from '../attendance/attendance.module';
import { StudentsResolver } from '../student/student.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Schedule]),AttendancesModule],
  controllers: [ScheduleController,StudentsResolver],
  providers: [ScheduleService],
})
export class ScheduleModule {}
