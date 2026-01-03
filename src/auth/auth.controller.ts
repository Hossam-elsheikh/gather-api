import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
} from '@nestjs/common';
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
  public async signIn(@Body() signInDto: SigninDTO) {
    return this.authService.login(signInDto);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
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
  public async logout(@AcitveUser() user: ActiveUserInterface) {
    return this.authService.logout(user.sub);
  }
}
