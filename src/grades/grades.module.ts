import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grade } from './entities/grade.entity';
import { GradesResolver } from './grades.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  controllers: [GradesController,GradesResolver],
  providers: [GradesService],
})
export class GradesModule {}
