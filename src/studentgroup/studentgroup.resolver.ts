import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { StudentgroupService } from "./studentgroup.service";
import { StudentGroup } from "./entities/studentgroup.entity";
import { CreateStudentgroupDto } from "./dto/create-studentgroup.dto";
import { UpdateStudentgroupDto } from "./dto/update-studentgroup.dto";

@Resolver(() => StudentGroup)
export class StudentgroupResolver {
  constructor(private readonly studentgroupService: StudentgroupService) {}

  @Mutation(() => StudentGroup)
  createStudentgroup(
    @Args("createStudentgroupDto") createStudentgroupDto: CreateStudentgroupDto
  ) {
    return this.studentgroupService.create(createStudentgroupDto);
  }

  @Query(() => [StudentGroup], { name: "studentgroups" })
  findAll() {
    return this.studentgroupService.findAll();
  }

  @Query(() => StudentGroup, { name: "studentgroup" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.studentgroupService.findOne(id);
  }

  @Mutation(() => StudentGroup)
  async updateStudentgroup(
    @Args("id", { type: () => Int }) id: number,
    @Args("updateStudentgroupDto") updateStudentgroupDto: UpdateStudentgroupDto
  ) {
    await this.studentgroupService.update(id, updateStudentgroupDto);
    return this.studentgroupService.findOne(id);
  }

  @Mutation(() => String)
  async removeStudentgroup(@Args("id", { type: () => Int }) id: number) {
    const result = await this.studentgroupService.remove(id);
    return result.message;
  }
}
