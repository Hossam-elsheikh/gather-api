import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Community } from './community.entity';
import { Genre } from '../../genres/entities/genre.entity';

@Entity('community_genres')
export class CommunityGenre {
  @PrimaryColumn({ name: 'community_id' })
  communityId: string;

  @PrimaryColumn({ name: 'genre_id' })
  genreId: string;

  @ManyToOne(() => Community, c => c.genres, { onDelete: 'CASCADE' })
  community: Community;

  @ManyToOne(() => Genre, g => g.communities, { onDelete: 'CASCADE' })
  genre: Genre;
}
