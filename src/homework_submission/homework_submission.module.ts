import { Module } from '@nestjs/common';
import { HomeworksubmissionsService } from './homework_submission.service';
import { HomeworkSubmissionController } from './homework_submission.controller';

@Module({
  controllers: [HomeworkSubmissionController],
  providers: [HomeworksubmissionsService],
})
export class HomeworkSubmissionModule {}
