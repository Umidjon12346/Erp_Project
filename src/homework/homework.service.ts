import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHomeworkDto } from "./dto/create-homework.dto";
import { UpdateHomeworkDto } from "./dto/update-homework.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Homework } from "./entities/homework.entity";
import { Repository } from "typeorm";

@Injectable()
export class HomeworkService {
  constructor(
    @InjectRepository(Homework)
    private readonly homeworkRepo: Repository<Homework>
  ) {}

  async create(createHomeworkDto: CreateHomeworkDto) {
    return this.homeworkRepo.save(createHomeworkDto);
  }

  findAll() {
    return this.homeworkRepo.find();
  }

  async findOne(id: number) {
    const homework = await this.homeworkRepo.findOneBy({ id });
    if (!homework) {
      throw new NotFoundException("Homework topilmadi");
    }
    return homework;
  }

  async update(id: number, updateHomeworkDto: UpdateHomeworkDto) {
    const update = await this.homeworkRepo.update(id, updateHomeworkDto);
    if (!update.affected) {
      throw new NotFoundException("Homework topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.homeworkRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("Homework topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
