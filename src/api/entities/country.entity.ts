import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RouteEntity } from './route.entity';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iso: string;

  @Column()
  ru_name: string;

  @Column()
  en_name: string;

  @Column({ nullable: true })
  iso3: string;

  @Column({ nullable: true })
  numcode: number;

  @Column({ nullable: true })
  phonecode: number;

  @ManyToMany(
    type => RouteEntity,
    route => route.countries,
  )
  routes: RouteEntity[];
}
