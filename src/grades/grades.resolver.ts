import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { GradesService } from "./grades.service";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { Grade } from "./entities/grade.entity";

@Resolver("grades")
export class GradesResolver {
  constructor(private readonly gradesService: GradesService) {}

  @Query(() => [Grade])
  findAllGrade() {
    return this.gradesService.findAll();
  }

  @Query(() => Grade)
  findOneGrade(@Args("id") id: number) {
    return this.gradesService.findOne(id);
  }

  @Mutation(() => Grade)
  createGrade(@Args("createGrade") createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Mutation(() => Grade)
  updateGrade(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateGrade") updateGradeDto: UpdateGradeDto
  ) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @Mutation(() => Number)
  removeGrade(@Args("id", { type: () => ID }) id: number) {
    return this.gradesService.remove(id);
  }
}
