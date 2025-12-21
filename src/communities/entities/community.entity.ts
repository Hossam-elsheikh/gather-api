import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CommunityMember } from './community-member.entity';
import { CommunityGenre } from './community-genre.entity';
import { CommunityJoinRequest } from './community-join-request.entity';


@Entity('communities')
export class Community {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'cover_image', nullable: true })
  coverImage: string;

  @Column({ name: 'is_private', default: false })
  isPrivate: boolean;

  @ManyToOne(() => User, user => user.ownedCommunities)
  owner: User;

  @Column({ name: 'owner_id' })
  ownerId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => CommunityMember, member => member.community)
  members: CommunityMember[];

  @OneToMany(() => CommunityGenre, cg => cg.community)
  genres: CommunityGenre[];

  @OneToMany(() => CommunityJoinRequest, request => request.community)
  joinRequests: CommunityJoinRequest[];
}
