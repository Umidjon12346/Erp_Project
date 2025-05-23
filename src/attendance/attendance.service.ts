import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAttendanceDto } from "./dto/create-attendance.dto";
import { UpdateAttendanceDto } from "./dto/update-attendance.dto";
import { Attendance } from "./entities/attendance.entity";

@Injectable()
export class AttendancesService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceRepo.save(createAttendanceDto);
  }

  findAll() {
    return this.attendanceRepo.find();
  }

  async findOne(id: number) {
    const attendance = await this.attendanceRepo.findOneBy({ id });
    if (!attendance) {
      throw new NotFoundException("Davomat topilmadi");
    }
    return attendance;
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    const update = await this.attendanceRepo.update(id, updateAttendanceDto);
    if (!update) {
      throw new NotFoundException("Davomat topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.attendanceRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Davomat topilmadi");
    }
    return {
      message: `${id} ning ma'lumotlar o'chirib yuborildi`,
    };
  }
}
