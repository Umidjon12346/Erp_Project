import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { GroupsResolver } from './group.resolver';

@Module({
  imports:[TypeOrmModule.forFeature([Group])],
  controllers: [GroupController,GroupsResolver],
  providers: [GroupService],
})
export class GroupModule {}
