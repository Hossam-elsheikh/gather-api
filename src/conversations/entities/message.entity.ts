import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/users/entities/user.entity';
import { Conversation } from 'src/conversations/entities/conversation.entity';

@Entity('messages')
export class Message extends BaseEntity {
  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation: Conversation;

  @Column({ default: false })
  isRead: boolean; // Simple read receipt tracking
}