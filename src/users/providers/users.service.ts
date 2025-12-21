import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUserParamsDto } from '../dtos/get-user-params.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;
    const user = this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
    });
    let newUser = this.userRepository.create(createUserDto);
    newUser = await this.userRepository.save(newUser);
    return newUser;
  }
  public async findOneById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }
}
