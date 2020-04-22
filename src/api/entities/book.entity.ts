import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from './route.entity';
import { AuthorEntity } from './author.entity';

@Entity('book')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  isbn?: string;

  @Column({ nullable: true })
  cover?: string;

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
  )
  routes: RouteEntity[];

  @ManyToMany(
    type => AuthorEntity,
    author => author.books,
  )
  @JoinTable()
  authors: AuthorEntity[];
}
