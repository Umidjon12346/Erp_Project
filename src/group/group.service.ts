import {
  Injectable,
  NotFoundException,
  BadGatewayException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateGroupDto } from "./dto/create-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { Group } from "./entities/group.entity";

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepo: Repository<Group>
  ) {}

  async create(createGroupDto: CreateGroupDto) {
    return this.groupRepo.save(createGroupDto);
  }

  findAll() {
    return this.groupRepo.find();
  }

  async findOne(id: number) {
    const group = await this.groupRepo.findOneBy({ id });
    if (!group) {
      throw new NotFoundException("Guruh topilmadi");
    }
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const update = await this.groupRepo.update(id, updateGroupDto);
    if (!update) {
      throw new NotFoundException("Guruh topilmadi");
    }
    return update;
  }

  async remove(id: number) {
    const delet = await this.groupRepo.delete(id);
    if (!delet) {
      throw new NotFoundException("Guruh topilmadi");
    }
    return {
      message: `${id} ning ma'lumotlar o'chirib yuborildi`,
    };
  }
}
