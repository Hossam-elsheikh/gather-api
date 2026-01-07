import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './providers/auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { AuthType } from './enums/auth-type.enum';
import { Auth } from './decorators/auth.decorator';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { AcitveUser } from './decorators/active-user.decorator';
import type { ActiveUserInterface } from './interfaces/active-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async signIn(
    @Body() signInDto: SigninDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.login(signInDto);

    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return tokens;
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshTokens(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.authService.refreshTokens(refreshTokenDto);

    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return tokens;
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.Bearer)
  public async me(@AcitveUser() user: ActiveUserInterface) {
    return this.authService.getMe(user.sub);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.Bearer)
  public async logout(
    @AcitveUser() user: ActiveUserInterface,
    @Res({ passthrough: true }) response: Response,
  ) {
    response.clearCookie('access_token');
    response.clearCookie('refresh_token');
    return this.authService.logout(user.sub);
  }
}
