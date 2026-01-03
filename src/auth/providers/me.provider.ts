import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MeProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async getMe(userId: number): Promise<User> {
    const user = await this.usersService.findOneById(userId);
    return user;
  }
}
