import { Module } from '@nestjs/common';
import { TeachergroupService } from './teachergroup.service';
import { TeachergroupController } from './teachergroup.controller';

@Module({
  controllers: [TeachergroupController],
  providers: [TeachergroupService],
})
export class TeachergroupModule {}
