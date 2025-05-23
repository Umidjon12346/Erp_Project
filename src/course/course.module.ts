import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesResolver } from './course.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Course])],
  controllers: [CourseController,CoursesResolver],
  providers: [CourseService],
})
export class CourseModule {}
