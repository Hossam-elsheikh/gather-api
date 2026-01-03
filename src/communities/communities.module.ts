import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { CommunityMember } from './entities/community-member.entity';
import { CommunityGenre } from './entities/community-genre.entity';
import { CommunityJoinRequest } from './entities/community-join-request.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Community,
      CommunityMember,
      CommunityGenre,
      CommunityJoinRequest,
    ]),
  ],
})
export class CommunitiesModule {}
