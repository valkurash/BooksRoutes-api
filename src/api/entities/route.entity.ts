import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEntity } from './book.entity';
import { PointEntity } from './point.entity';
import { AuthorEntity } from './author.entity';
import { CountryEntity } from './country.entity';
import { LanguageEntity } from './language.entity';

@Entity('route')
export class RouteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  googlemymap?: string;

  @ManyToOne(
    type => BookEntity,
    book => book.routes,
  )
  book: BookEntity;

  @OneToMany(
    type => PointEntity,
    point => point.id,
  )
  points: PointEntity[];

  @ManyToMany(
    type => CountryEntity,
    country => country.routes,
  )
  @JoinTable()
  countries: CountryEntity[];

  @ManyToMany(
    type => LanguageEntity,
    language => language.routes,
  )
  @JoinTable()
  languages: LanguageEntity[];
}
