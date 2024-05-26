import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    if (!user) {
      return 'Login failed';
    }
    const { accessToken } = await this.authService.kakaoValidateUser(
      user.kakao,
    );

    res.cookie('accessToken', accessToken, { httpOnly: true });

    return res.redirect(this.configService.get('settings.clientUrl'));
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req: Request) {
    const user = await this.authService.validateUser(req.user.userId);
    return user;
  }
}
