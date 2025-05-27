import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { HomeworkService } from "./homework.service";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { Homework } from "./entities/homework.entity";

@Resolver("homeworks")
export class HomeworksResolver {
  constructor(private readonly homeworksService: HomeworkService) {}

  @Query(() => [Homework])
  findAllHomework() {
    return this.homeworksService.findAll();
  }

  @Query(() => Homework)
  findOneHomework(@Args("id") id: number) {
    return this.homeworksService.findOne(id);
  }

  @Mutation(() => Homework)
  createHomework(@Args("createHomework") createHomeworkDto: CreateHomeworkDto) {
    return this.homeworksService.create(createHomeworkDto);
  }

  @Mutation(() => Homework)
  updateHomework(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateHomework") updateHomeworkDto: UpdateHomeworkDto
  ) {
    return this.homeworksService.update(id, updateHomeworkDto);
  }

  @Mutation(() => Number)
  removeHomework(@Args("id", { type: () => ID }) id: number) {
    return this.homeworksService.remove(id);
  }
}
