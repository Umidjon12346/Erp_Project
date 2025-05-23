import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherGroupDto } from './dto/create-teachergroup.dto';
import { UpdateTeacherGroupDto } from './dto/update-teachergroup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherGroup } from './entities/teachergroup.entity';

@Injectable()
export class TeachergroupService {
  constructor(@InjectRepository(TeacherGroup) private readonly teacherGroupRepo:Repository<TeacherGroup>){}
  async create(dto: CreateTeacherGroupDto) {
    const teacherGroup = this.teacherGroupRepo.create({
      teacher_id: dto.teacherId,
      group_id: dto.groupId,
    });
    return this.teacherGroupRepo.save(teacherGroup);
  }

  async findAll() {
    return this.teacherGroupRepo.find({ relations: ["teacher", "group"] });
  }

  async findOne(teacherId: number, groupId: number) {
    return this.teacherGroupRepo.findOne({
      where: {
        teacher_id:   teacherId ,
       group_id:groupId,
      },
      relations: ["teacher", "group"],
    });
  }

  async remove(teacherId: number, groupId: number) {
    const result = await this.teacherGroupRepo.delete({
      teacher_id: teacherId,
      group_id: groupId,
    });
    if (result.affected === 0) {
      throw new NotFoundException("O‘qituvchi-guruh topilmadi");
    }
    return { message: "O‘chirildi" };
  }
}
