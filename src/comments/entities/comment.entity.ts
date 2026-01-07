import { BaseEntity } from 'src/common/BaseEntity';
import { Post } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';


@Entity('comments')
export class Comment extends BaseEntity {
  @Column({ type: 'text' })
  body: string;

  @ManyToOne(() => User, (user) => user.comments)
  author: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  // Parent/Child for nested comments
  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];
}