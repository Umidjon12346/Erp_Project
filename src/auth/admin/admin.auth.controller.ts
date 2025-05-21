import { Body, Controller, Param, ParseIntPipe, Post, Res } from "@nestjs/common";
import { AuthAdminService } from "./admin.auth.service";
import { SignInDto } from "../dto/sign.in.dto";
import { Response } from "express";
import { CookieGetter } from "../../common/decorators/cookie-getter.decorator";

@Controller("auth/admin")
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post("sign-in")
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signIn(signInDto, res);
  }

  @Post(":id/refresh")
  async userRefreshToken(
    @Param("id", ParseIntPipe) id: number,
    @CookieGetter("admin_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.adminRefreshToken(id, refresh_token, res);
  }

  @Post("sign-out")
  async signOut(
    @CookieGetter("admin_refresh_token") refresh_token: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authAdminService.signOut(refresh_token, res);
  }
}