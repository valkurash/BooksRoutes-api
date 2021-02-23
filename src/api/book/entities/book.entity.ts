import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from '../../route/entities/route.entity';
import { AuthorEntity } from '../../author/entities/author.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { BookrateEntity } from '../../rating/entity/bookrate.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  isbn?: string;

  @Column()
  description: string;

  @Column()
  moderated: boolean;

  @Column({ nullable: true })
  litres?: string;

  @Column({ nullable: true })
  ozon?: string;

  @OneToMany(
    type => RouteEntity,
    route => route.book,
    { onDelete: 'CASCADE' },
  )
  routes: RouteEntity[];

  @ManyToOne(
    type => ImageEntity,
    image => image.id,
  )
  coverImg: ImageEntity;

  @Column({ nullable: false })
  coverImgId: number;

  @ManyToMany(
    type => AuthorEntity,
    author => author.books,
  )
  @JoinTable()
  authors: AuthorEntity[];

  @OneToMany(
    type => BookrateEntity,
    like => like.book,
  )
  likes: BookrateEntity[];

  @BeforeInsert()
  beforeInsertActions() {
    this.moderated = false;
  }
}
