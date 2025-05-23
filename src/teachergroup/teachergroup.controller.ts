import { Controller, Get, Post, Body, Delete, Query } from "@nestjs/common";
import { TeachergroupService } from "./teachergroup.service";
import { CreateTeacherGroupDto } from "./dto/create-teachergroup.dto";

@Controller("teachergroup")
export class TeachergroupController {
  constructor(private readonly teachergroupService: TeachergroupService) {}

  @Post()
  create(@Body() createTeachergroupDto: CreateTeacherGroupDto) {
    return this.teachergroupService.create(createTeachergroupDto);
  }

  @Get()
  findAll() {
    return this.teachergroupService.findAll();
  }

  @Get("one")
  findOne(
    @Query("teacherId") teacherId: number,
    @Query("groupId") groupId: number
  ) {
    return this.teachergroupService.findOne(teacherId, groupId);
  }

  @Delete()
  remove(
    @Query("teacherId") teacherId: number,
    @Query("groupId") groupId: number
  ) {
    return this.teachergroupService.remove(teacherId, groupId);
  }
}
