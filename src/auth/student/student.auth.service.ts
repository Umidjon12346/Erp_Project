import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminService } from "../../admin/admin.service";
import { Admin } from "../../admin/entities/admin.entity";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { TeacherService } from "../../teacher/teacher.service";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { StudentsService } from "../../student/student.service";
import { Student } from "../../student/entities/student.entity";

@Injectable()
export class AuthStudentService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly studentService: StudentsService
  ) {}

  async generateToken(student: Student) {
    const payload = {
      id: student.id,
      is_active: student.is_active,
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

  async signIn(singInDto: SignInDto, res: Response) {
    const student = await this.studentService.findStudentByEmail(
      singInDto.email
    );

    if (!student) {
      throw new BadRequestException("Email yoki password hato");
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      student.hashed_password
    );

    if (!isValidPassword) {
      throw new BadRequestException("Email yoki passwor hato p ");
    }
    const tokens = await this.generateToken(student);
    res.cookie("student_refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      student.refresh_token = hashed_refresh_token;
      await this.studentService.update(student.id, student);
    } catch (error) {
      console.log("Token da xatolik !?!");
    }

    return {
      message: "Tizimga hush kelibsiz",
      accessToken: tokens.accessToken,
    };
  }

  async signOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const student =
      await this.studentService.findStudentByRefresh(refresh_token);

    if (!student) {
      throw new BadRequestException("Token yoq yoki noto'g'ri");
    }
    student.refresh_token = "";
    await this.studentService.update(student.id, student);

    res.clearCookie("student_refresh_token");

    return { message: "Eson omon chiqib olding" };
  }

  async refreshToken(req: Request, res: Response) {
    const refresh_token = req.cookies["student_refresh_token"];
    if (!refresh_token) {
      throw new ForbiddenException("Refresh token yo'q");
    }

    const students = await this.studentService.findAll();
    const student = students.find(
      (student) =>
        student.refresh_token &&
        bcrypt.compareSync(refresh_token, student.refresh_token)
    );

    if (!student) {
      throw new ForbiddenException("Refresh token noto'g'ri");
    }

    const tokens = await this.generateToken(student);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    student.refresh_token = hashed_refresh_token;
    await this.studentService.update(student.id, student);

    res.cookie("student_refresh_token", tokens.refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
    });

    return {
      message: "Token refresh token ga o'zgardi ",
      accessToken: tokens.accessToken,
    };
  }
}