import { CommunityGenre } from 'src/communities/entities/community-genre.entity';
import { UserGenre } from 'src/users/entities/user-genre.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => UserGenre, ug => ug.genre)
  users: UserGenre[];

  @OneToMany(() => CommunityGenre, cg => cg.genre)
  communities: CommunityGenre[];
}
