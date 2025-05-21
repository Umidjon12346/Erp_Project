import { Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./entities/admin.entity";
import { Repository } from "typeorm";

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password } = createAdminDto;
    const hashed_password = await bcrypt.hash(password, 7);

    const newUser = await this.adminRepo.save({
      ...createAdminDto,
      hashed_password,
    });
    return newUser;
  }

  findAll() {
    return this.adminRepo.find();
  }

  findOne(id: number) {
    return this.adminRepo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.adminRepo.findOneBy({ email });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    await this.adminRepo.update(id, updateAdminDto);
    const product = this.findOne(id);
    return product;
  }

  async updateRefreshToken(id: number, hashed_refresh_token: string) {
    await this.adminRepo.update(id, {
      hashed_refresh_token,
    });
  }

  async remove(id: number) {
    await this.adminRepo.delete(id);
    return id;
  }
}
