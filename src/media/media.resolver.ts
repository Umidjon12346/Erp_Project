import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { MediaService } from "./media.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./entities/media.entity";

@Resolver("media")
export class MediaResolver {
  constructor(private readonly mediaService: MediaService) {}

  @Query(() => [Media])
  findAllMedia() {
    return this.mediaService.findAll();
  }

  @Query(() => Media)
  findOneMedia(@Args("id") id: number) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  createMedia(@Args("createMedia") createMediaDto: CreateMediaDto) {
    return this.mediaService.create(createMediaDto);
  }

  @Mutation(() => Media)
  updateMedia(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateMedia") updateMediaDto: UpdateMediaDto
  ) {
    return this.mediaService.update(id, updateMediaDto);
  }

  @Mutation(() => Number)
  removeMedia(@Args("id", { type: () => ID }) id: number) {
    return this.mediaService.remove(id);
  }
}
