import { Entity, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/users/entities/user.entity';
import { Message } from './message.entity';

@Entity('conversations')
export class Conversation extends BaseEntity {
  @ManyToMany(() => User, (user) => user.conversations)
  @JoinTable() // Owner side
  participants: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages: Message[];
}