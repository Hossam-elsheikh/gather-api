import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Community } from './community.entity';

export enum CommunityRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member',
}

@Entity('community_members')
export class CommunityMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Community, community => community.members, { onDelete: 'CASCADE' })
  community: Community;

  @Column({ name: 'community_id' })
  communityId: string;

  @ManyToOne(() => User, user => user.memberships, { onDelete: 'CASCADE' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: CommunityRole,
    default: CommunityRole.MEMBER,
  })
  role: CommunityRole;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;
}
