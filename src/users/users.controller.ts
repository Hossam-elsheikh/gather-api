import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamsDto } from './dtos/get-user-params.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Auth(AuthType.None)
  @Get()
  public getUsers(
    @Param() getUserParamDto: GetUserParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe) page: number,
  ) {
    return this.userService.findAll(getUserParamDto, limit, page);
  }
  @Auth(AuthType.None)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  public CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto); // this not needed to be async
  }
}
