import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './admin/admin.auth.controller';
import { AuthAdminService } from './admin/admin.auth.service';
import { AuthTeacherController } from './teacher/teacher.auth.controller';
import { TeacherModule } from '../teacher/teacher.module';
import { AuthTeacherService } from './teacher/teacher.auth.service';


@Module({
  imports: [JwtModule.register({ global: true }),AdminModule,TeacherModule],
  controllers: [AuthAdminController,AuthTeacherController],
  providers: [AuthAdminService,AuthTeacherService],
})
export class AuthModule {}
