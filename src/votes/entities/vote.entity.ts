import { Comment } from 'src/comments/entities/comment.entity';
import { BaseEntity } from 'src/common/BaseEntity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';


export enum VoteType {
  UPVOTE = 1,
  DOWNVOTE = -1,
}

@Entity('votes')
export class Vote extends BaseEntity {
  @Column({ type: 'enum', enum: VoteType })
  value: VoteType;

  @ManyToOne(() => User, (user) => user.votes)
  user: User;

  @ManyToOne(() => Post, (post) => post.votes, { nullable: true, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.votes, { nullable: true, onDelete: 'CASCADE' })
  comment: Comment;
}