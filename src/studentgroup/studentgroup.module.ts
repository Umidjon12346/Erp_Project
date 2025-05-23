import { Module } from '@nestjs/common';
import { StudentgroupService } from './studentgroup.service';
import { StudentgroupController } from './studentgroup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentGroup } from './entities/studentgroup.entity';
import { StudentgroupResolver } from './studentgroup.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([StudentGroup])],
  controllers: [StudentgroupController,StudentgroupResolver],
  providers: [StudentgroupService],
})
export class StudentgroupModule {}
