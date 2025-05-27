import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    return this.mediaRepo.save(createMediaDto);
  }

  findAll() {
    return this.mediaRepo.find();
  }

  async findOne(id: number) {
    const media = await this.mediaRepo.findOneBy({ id });
    if (!media) {
      throw new NotFoundException("Media topilmadi");
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const update = await this.mediaRepo.update(id, updateMediaDto);
    if (!update.affected) {
      throw new NotFoundException("Media topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.mediaRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("Media topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
