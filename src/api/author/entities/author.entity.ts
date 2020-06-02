import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { AuthorrateEntity } from '../../rating/entity/authorrate.entity';

@Entity('author')
export class AuthorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  avatarId?: number;

  @Column({ nullable: true })
  wiki?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(
    type => ImageEntity,
    image => image.id,
  )
  avatar: ImageEntity;

  @ManyToMany(
    type => BookEntity,
    book => book.authors,
  )
  books: BookEntity[];

  @OneToMany(
    type => AuthorrateEntity,
    like => like.author,
  )
  likes: AuthorrateEntity[];

  @Column({ nullable: true })
  birthdate: Date;
  @Column({ nullable: true })
  dateOfDeath: Date;
}
