import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./entities/schedule.entity";

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    return this.scheduleRepo.save(createScheduleDto);
  }

  findAll() {
    return this.scheduleRepo.find();
  }

  async findOne(id: number) {
    const schedule = await this.scheduleRepo.findOneBy({ id });
    if (!schedule) {
      throw new NotFoundException("Dars jadvali topilmadi");
    }
    return schedule;
  }

  async update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const update = await this.scheduleRepo.update(id, updateScheduleDto);
    if (!update) {
      throw new NotFoundException("Dars jadvali topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.scheduleRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Dars jadvali topilmadi");
    }
    return {
      message: `${id} ning ma'lumotlar o'chirib yuborildi`,
    };
  }
}
