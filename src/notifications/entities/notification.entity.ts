import { Entity, Column, ManyToOne, Index } from 'typeorm';

import { NotificationType } from '../enums/NotificationType';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Comment } from 'src/comments/entities/comment.entity';

@Entity()
@Index(['recipient', 'isRead']) // For fast fetching of unread counts
export class Notification extends BaseEntity {
  @ManyToOne(() => User, (user) => user.notifications)
  recipient: User;

  @ManyToOne(() => User) // Optional: System notifications might not have a sender
  sender: User;

  @Column({ type: 'enum', enum: NotificationType })
  type: NotificationType;

  @Column({ default: false })
  isRead: boolean;

  // Optional: A short text summary (e.g., "JohnDoe replied to your post")
  @Column({ nullable: true })
  content: string;

  // Polymorphic Links: Link to the object that triggered the notification
  @ManyToOne(() => Post, { nullable: true, onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, { nullable: true, onDelete: 'CASCADE' })
  comment: Comment;
}