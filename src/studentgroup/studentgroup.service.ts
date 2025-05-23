import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStudentgroupDto } from "./dto/create-studentgroup.dto";
import { UpdateStudentgroupDto } from "./dto/update-studentgroup.dto";
import { StudentGroup } from "./entities/studentgroup.entity";

@Injectable()
export class StudentgroupService {
  constructor(
    @InjectRepository(StudentGroup)
    private readonly studentgroupRepo: Repository<StudentGroup>
  ) {}

  async create(createStudentgroupDto: CreateStudentgroupDto) {
    return this.studentgroupRepo.save(createStudentgroupDto);
  }

  findAll() {
    return this.studentgroupRepo.find();
  }

  async findOne(id: number) {
    const studentgroup = await this.studentgroupRepo.findOneBy({ id });
    if (!studentgroup) {
      throw new NotFoundException("Talabalar guruhi topilmadi");
    }
    return studentgroup;
  }

  async update(id: number, updateStudentgroupDto: UpdateStudentgroupDto) {
    const update = await this.studentgroupRepo.update(
      id,
      updateStudentgroupDto
    );
    if (!update) {
      throw new NotFoundException("Talabalar guruhi topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.studentgroupRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Talabalar guruhi topilmadi");
    }
    return {
      message: `${id} ning ma'lumotlar o'chirib yuborildi`,
    };
  }
}
