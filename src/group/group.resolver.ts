import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";

@Resolver(() => Group)
export class GroupsResolver {
  constructor(private readonly groupsService: GroupService) {}

  @Mutation(() => Group)
  createGroup(@Args("createGroup") createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Query(() => [Group])
  findAllGroups() {
    return this.groupsService.findAll();
  }

  @Query(() => Group)
  findOneGroup(@Args("id", { type: () => ID }) id: number) {
    return this.groupsService.findOne(id);
  }

  @Mutation(() => Group)
  updateGroup(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateGroup") updateGroupDto: UpdateGroupDto
  ) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Mutation(() => Number)
  removeGroup(@Args("id", { type: () => ID }) id: number) {
    return this.groupsService.remove(id);
  }
}
