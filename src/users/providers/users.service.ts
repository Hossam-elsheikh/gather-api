import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOneByEmailProvider } from './find-one-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { CreateUserProvider } from './create-user.provider';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  constructor(
    // injecting user repo
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneByEmailProvider: FindOneByEmailProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  public async findAll(
    getUserParamsDto: GetUserParamsDto,
    limit: number,
    page: number,
  ) {
    const users = await this.userRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
    return users;
    // demonstration of custom exception
    // throw new HttpException(
    //   {
    //     status: HttpStatus.MOVED_PERMANENTLY,
    //     error: 'The API endpoint does not exist',
    //   },
    //   HttpStatus.MOVED_PERMANENTLY,
    //   {
    //     description: 'API endpoint was prementatly moved',
    //   },
    // );
  }

  public async findOneById(id: number) {
    let user;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment!, please try again later',
        { description: 'Error connecting to the database' },
      );
    }
    if (!user) {
      throw new BadRequestException('user id is not exist');
    }
    return user;
  }

  public async findOneByEmail(email: string) {
    return this.findOneByEmailProvider.findUserByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    // this method doen't has a controller method, so we build GoogleUser as interface not dto,
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
