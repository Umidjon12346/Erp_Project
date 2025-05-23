import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './admin/admin.auth.controller';
import { AuthAdminService } from './admin/admin.auth.service';
import { AuthTeacherController } from './teacher/teacher.auth.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { AuthTeacherService } from './teacher/teacher.auth.service';
import { StudentModule } from '../student/student.module';
import { AuthStudentController } from './student/student.auth.controller';
import { AuthStudentService } from './student/student.auth.service';


@Module({
  imports: [JwtModule.register({ global: true }),AdminModule,TeacherModule,StudentModule],
  controllers: [AuthAdminController,AuthTeacherController,AuthStudentController],
  providers: [AuthAdminService,AuthTeacherService,AuthStudentService],
})
export class AuthModule {}
