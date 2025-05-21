import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../../admin/admin.service";
import { Admin } from "../../admin/entities/admin.entity";
import { SignInDto } from "../dto/sign.in.dto";
import { Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService
  ) {}

  async generateTokens(admin: Admin) {
    const payload = {
      id: admin.id,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signIn(signInDto: SignInDto, res: Response) {
    const staff = await this.adminService.findByEmail(signInDto.email);
    if (!staff) {
      throw new BadRequestException("Email yoki password");
    }
    const isValid = await bcrypt.compare(
      signInDto.password,
      staff.hashed_password
    );
    if (!isValid) {
      throw new BadRequestException("Email yoki password");
    }
    const { accessToken, refreshToken } = await this.generateTokens(staff);

    res.cookie("admin_refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    try {
      staff.hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
      await this.adminService.update(staff.id,staff);
    } catch (error) {
      console.error("Tokenni saqlashda xatolik:", error);
    }

    return { message: "xush kormdik Admin", accessToken };
  }

  async adminRefreshToken(id: number, refresh_token: string, res: Response) {
    const decodedToken = await this.jwtService.decode(refresh_token);

    if (id !== decodedToken.id) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const user = await this.adminService.findOne(id);
    if (!user || !user.hashed_refresh_token) {
      throw new ForbiddenException("Foydalanuvchi topilmadi");
    }
    const match = await bcrypt.compare(
      refresh_token,
      user.hashed_refresh_token
    );
    if (!match) {
      throw new ForbiddenException("Refresh token mos emas");
    }

    const tokens = await this.generateTokens(user);

    user.hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    await this.adminService.update(user.id, user);

    res.cookie("admin_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });

    return { accessToken: tokens.accessToken };
  }

  async signOut(refresh_token: string, res: Response) {
    const userData = this.jwtService.verify(refresh_token, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new ForbiddenException("Staff uchun emas");
    }

    const hashed_refresh_token = " ";
    await this.adminService.updateRefreshToken(
      userData.id,
      hashed_refresh_token!
    );

    res.clearCookie("admin_refresh_token");

    return { message: "Eson-omon chiqib olding" };
  }
}
