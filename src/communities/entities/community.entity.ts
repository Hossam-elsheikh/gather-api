import { BaseEntity } from 'src/common/BaseEntity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity('communities')
export class Community extends BaseEntity {
  @Column({ unique: true })
  name: string; // e.g., "g/SpaceX"

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  bannerUrl: string;

  @ManyToOne(() => User, (user) => user.ownedCommunities)
  owner: User;

  @OneToMany(() => Post, (post) => post.community)
  posts: Post[];

  @ManyToMany(() => User, (user) => user.joinedCommunities)
  members: User[];

  // --- THE TWIST: Community Genres ---
  @ManyToMany(() => Genre, (genre) => genre.taggedCommunities)
  @JoinTable() // Owner side
  genres: Genre[];
}