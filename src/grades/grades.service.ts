import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade.dto";
import { UpdateGradeDto } from "./dto/update-grade.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Grade } from "./entities/grade.entity";
import { Repository } from "typeorm";

@Injectable()
export class GradesService {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>
  ) {}

  async create(createGradeDto: CreateGradeDto) {
    return this.gradeRepo.save(createGradeDto);
  }

  findAll() {
    return this.gradeRepo.find();
  }

  async findOne(id: number) {
    const grade = await this.gradeRepo.findOneBy({ id });
    if (!grade) {
      throw new NotFoundException("Grade topilmadi");
    }
    return grade;
  }

  async update(id: number, updateGradeDto: UpdateGradeDto) {
    const update = await this.gradeRepo.update(id, updateGradeDto);
    if (!update.affected) {
      throw new NotFoundException("Grade topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.gradeRepo.delete(id);
    if (!delet.affected) {
      throw new NotFoundException("Grade topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
