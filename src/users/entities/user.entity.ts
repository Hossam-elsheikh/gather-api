import { Comment } from 'src/comments/entities/comment.entity';
import { BaseEntity } from 'src/common/BaseEntity';
import { Community } from 'src/communities/entities/community.entity';
import { Conversation } from 'src/conversations/entities/conversation.entity';
import { Message } from 'src/conversations/entities/message.entity';
import { Genre } from 'src/genres/entities/genre.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Post } from 'src/posts/entities/post.entity';
import { Vote } from 'src/votes/entities/vote.entity';
import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true,nullable:true })
  googleId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  // User creates posts
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  // User creates comments
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];

  // User casts votes
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

  // User joins communities
  @ManyToMany(() => Community, (community) => community.members)
  joinedCommunities: Community[];

  // User owns communities
  @OneToMany(() => Community, (community) => community.owner)
  ownedCommunities: Community[];

  // --- THE TWIST: User Interests ---
  @ManyToMany(() => Genre, (genre) => genre.interestedUsers)
  @JoinTable() // Owner side of the relationship
  interests: Genre[];

  @OneToMany(() => Notification, (notif) => notif.recipient)
  notifications: Notification[];

  @ManyToMany(() => Conversation, (conv) => conv.participants)
  conversations: Conversation[];

  @OneToMany(() => Message, (msg) => msg.sender)
  sentMessages: Message[];
}
