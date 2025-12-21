import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GetUserParamsDto } from './dtos/get-user-params.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  public getUsers() {
    return 'get users';
  }

  @Get('/{:id}')
  public getUser(
    @Param() getUserParamsDto: GetUserParamsDto,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit: number,
  ) {
    console.log(getUserParamsDto, page, limit);

    return 'get user';
  }
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
