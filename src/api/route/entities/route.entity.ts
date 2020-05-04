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
import { PointEntity } from './point.entity';
import { LanguageEntity } from '../../dictionaries/entities/language.entity';
import { CountryEntity } from '../../dictionaries/entities/country.entity';

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
    point => point.route,
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
