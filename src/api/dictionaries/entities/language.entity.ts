import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RouteEntity } from '../../route/entities/route.entity';

@Entity('language')
export class LanguageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ru_name: string;

  @Column()
  en_name: string;

  @Column()
  iso639: string;

  @ManyToMany(
    type => RouteEntity,
    route => route.languages,
  )
  routes: RouteEntity[];
}
