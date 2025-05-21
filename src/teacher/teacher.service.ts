import { Injectable } from "@nestjs/common";
import { CreateTeacherDto } from "./dto/create-teacher.dto";
import { UpdateTeacherDto } from "./dto/update-teacher.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "./entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher) private readonly teacherRepo: Repository<Teacher>
  ) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const { password } = createTeacherDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.teacherRepo.save({
      ...createTeacherDto,
      hashed_password,
    });
    return newUser;
  }

  findAll() {
    return this.teacherRepo.find();
  }

  findOne(id: number) {
    return this.teacherRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.teacherRepo.findOneBy({ email });
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    await this.teacherRepo.update(id, updateTeacherDto);
    const product = this.findOne(id);
    return product;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.teacherRepo.update(id, {
      hashed_refresh_token,
    });
  }

  async remove(id: number) {
    await this.teacherRepo.delete(id);
    return id;
  }
}
