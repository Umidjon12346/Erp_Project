import { Body, Controller, Param, ParseIntPipe, Post, Req, Res } from "@nestjs/common";
import { SignInDto } from "../dto/sign.in.dto";
import { Request, Response } from "express";
import { AuthStudentService } from "./student.auth.service";


@Controller("auth/student")
export class AuthStudentController {
  constructor(private readonly authStudentService: AuthStudentService) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStudentService.signIn(signInDto, res);
  }

  @Post(":id/refresh")
  async userRefreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStudentService.refreshToken(req, res);
  }

  @Post("sign-out")
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authStudentService.signOut(req, res);
  }
}

