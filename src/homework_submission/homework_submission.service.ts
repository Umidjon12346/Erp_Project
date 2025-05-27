import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateHomeworksubmissionDto } from "./dto/create-homework_submission.dto";
import { UpdateHomeworksubmissionDto } from "./dto/update-homework_submission.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Homeworksubmission } from "./entities/homework_submission.entity";
import { Repository } from "typeorm";

@Injectable()
export class HomeworksubmissionsService {
  constructor(
    @InjectRepository(Homeworksubmission)
    private readonly homeworksubmissionRepo: Repository<Homeworksubmission>
  ) {}

  async create(createHomeworksubmissionDto: CreateHomeworksubmissionDto) {
    return this.homeworksubmissionRepo.save(createHomeworksubmissionDto);
  }

  findAll() {
    return this.homeworksubmissionRepo.find();
  }

  async findOne(id: number) {
    const submission = await this.homeworksubmissionRepo.findOneBy({ id });
    if (!submission) {
      throw new NotFoundException("Homeworksubmission topilmadi");
    }
    return submission;
  }

  async update(
    id: number,
    updateHomeworksubmissionDto: UpdateHomeworksubmissionDto
  ) {
    const update = await this.homeworksubmissionRepo.update(
      id,
      updateHomeworksubmissionDto
    );
    if (!update.affected) {
      throw new NotFoundException("Homeworksubmission topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.homeworksubmissionRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("Homeworksubmission topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
