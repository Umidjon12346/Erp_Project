import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "./entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    return this.courseRepo.save(createCourseDto);
  }

  findAll() {
    return this.courseRepo.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOneBy({ id });
    if (!course) {
      throw new NotFoundException("Course topilmadi");
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const update = await this.courseRepo.update(id, updateCourseDto);
    if (!update) {
      throw new NotFoundException("Course topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.courseRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Course topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
