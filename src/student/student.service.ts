import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const { password, confirm_password, ...otherData } = createStudentDto;
    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    return this.studentRepo.save({
      ...otherData,
      hashed_password,
    });
  }

  findAll() {
    return this.studentRepo.find();
  }

  async findOne(id: number) {
    const student = await this.studentRepo.findOneBy({ id });
    if (!student) {
      throw new NotFoundException("Student topilmadi");
    }
    return student;
  }

  async findStudentByEmail(email: string) {
    const student = await this.studentRepo.findOne({ where: { email } });
    return student;
  }

  async findStudentByRefresh(refresh_token: string) {
    const students = await this.studentRepo.find();

    for (const student of students) {
      const match = await bcrypt.compare(refresh_token, student.refresh_token);
      if (match) return student;
    }

    return null;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const update = await this.studentRepo.update(id, updateStudentDto);
    if (!update) {
      throw new NotFoundException("Student topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.studentRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Student topilmadi");
    }
    return {
      message: "Ma'lumotlar o'chirib yuborildi",
    };
  }
}
