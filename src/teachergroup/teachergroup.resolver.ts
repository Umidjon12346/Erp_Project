import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { TeachergroupService } from "./teachergroup.service";
import { TeacherGroup } from "./entities/teachergroup.entity";
import { CreateTeacherGroupDto } from "./dto/create-teachergroup.dto";

@Resolver(() => TeacherGroup)
export class TeachergroupResolver {
  constructor(private readonly teachergroupService: TeachergroupService) {}

  @Mutation(() => TeacherGroup)
  createTeacherGroup(
    @Args("createTeacherGroupDto") createTeacherGroupDto: CreateTeacherGroupDto
  ) {
    return this.teachergroupService.create(createTeacherGroupDto);
  }

  @Query(() => [TeacherGroup], { name: "teacherGroups" })
  findAll() {
    return this.teachergroupService.findAll();
  }

  @Query(() => TeacherGroup, { name: "teacherGroup" })
  findOne(
    @Args("teacherId", { type: () => Int }) teacherId: number,
    @Args("groupId", { type: () => Int }) groupId: number
  ) {
    return this.teachergroupService.findOne(teacherId, groupId);
  }

  @Mutation(() => String)
  async removeTeacherGroup(
    @Args("teacherId", { type: () => Int }) teacherId: number,
    @Args("groupId", { type: () => Int }) groupId: number
  ) {
    const result = await this.teachergroupService.remove(teacherId, groupId);
    return result.message;
  }
}
