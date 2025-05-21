import { Body, Controller, Param, ParseIntPipe, Post, Res } from "@nestjs/common";

import { SignInDto } from "../dto/sign.in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";
import { AuthTeacherService } from "./teacher.auth.service";

@Controller("auth/teacher")
export class AuthTeacherController {
  constructor(private readonly authTeacherService: AuthTeacherService ) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authTeacherService.signIn(signInDto, res);
  }

  @Post(":id/refresh")
  async userRefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("teacher_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authTeacherService.adminRefreshToken(id, refresh_token, res);
  }

  @Post("sign-out")
  async signOut(
    @CookieGetter("teacher_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authTeacherService.signOut(refresh_token, res);
  }

  
}