import { BaseEntity } from 'src/common/BaseEntity';
import { Community } from 'src/communities/entities/community.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity('genres')
export class Genre extends BaseEntity {
  @Column({ unique: true })
  name: string; // e.g., "Technology", "Sci-Fi", "Cooking"

  @Column()
  description: string;

  // Users interested in this genre
  @ManyToMany(() => User, (user) => user.interests)
  interestedUsers: User[];

  // Communities tagged with this genre
  @ManyToMany(() => Community, (community) => community.genres)
  taggedCommunities: Community[];
}