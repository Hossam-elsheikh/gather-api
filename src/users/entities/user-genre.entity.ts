import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity('user_genres')
export class UserGenre {
  @PrimaryColumn({ name: 'user_id' })
  userId: string;

  @PrimaryColumn({ name: 'genre_id' })
  genreId: string;

  @ManyToOne(() => User, user => user.genres, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Genre, genre => genre.users, { onDelete: 'CASCADE' })
  genre: Genre;
}
