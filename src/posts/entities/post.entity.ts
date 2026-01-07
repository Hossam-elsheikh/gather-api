import { Comment } from 'src/comments/entities/comment.entity';
import { BaseEntity } from 'src/common/BaseEntity';
import { Community } from 'src/communities/entities/community.entity';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ nullable: true })
  mediaUrl: string;

  @Column({ default: 0 })
  upvoteCount: number;

  @Column({ default: 0 })
  downvoteCount: number;

  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  @ManyToOne(() => Community, (community) => community.posts)
  community: Community;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Vote, (vote) => vote.post)
  votes: Vote[];
}
