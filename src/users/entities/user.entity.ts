import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Community } from '../../communities/entities/community.entity';
import { CommunityMember } from 'src/communities/entities/community-member.entity';
import { CommunityJoinRequest } from 'src/communities/entities/community-join-request.entity';
import { UserGenre } from './user-genre.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ unique: true })
  email: string;
  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'is_verified', default: false })
  isVerified: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  /* Relations */

  @OneToMany(() => Community, (community) => community.owner)
  ownedCommunities: Community[];

  @OneToMany(() => CommunityMember, (member) => member.user)
  memberships: CommunityMember[];

  @OneToMany(() => CommunityJoinRequest, (request) => request.user)
  joinRequests: CommunityJoinRequest[];

  @OneToMany(() => UserGenre, (ug) => ug.user)
  genres: UserGenre[];
}
