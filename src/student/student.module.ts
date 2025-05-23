import { Module } from '@nestjs/common';
import { StudentsService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentsService],
  exports:[StudentsService]
})
export class StudentModule {}
