import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { Teacher } from './teacher/entities/teacher.entity';
import { Admin } from './admin/entities/admin.entity';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Student } from './student/entities/student.entity';
import { AttendancesModule } from './attendance/attendance.module';
import { ScheduleModule } from './schedule/schedule.module';
import { CourseModule } from './course/course.module';
import { GroupModule } from './group/group.module';
import { StudentgroupModule } from './studentgroup/studentgroup.module';
import { TeachergroupModule } from './teachergroup/teachergroup.module';
import { GradesModule } from './grades/grades.module';
import { HomeworkModule } from './homework/homework.module';
import { MediaModule } from './media/media.module';
import { HomeworkSubmissionModule } from './homework_submission/homework_submission.module';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [Teacher, Admin,Student],
      synchronize: true,
    }),
    AdminModule,
    TeacherModule,
    AuthModule,
    StudentModule,
    AttendancesModule,
    ScheduleModule,
    CourseModule,
    GroupModule,
    StudentgroupModule,
    TeachergroupModule,
    GradesModule,
    HomeworkModule,
    MediaModule,
    HomeworkSubmissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
