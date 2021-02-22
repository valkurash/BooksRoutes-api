import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RouteEntity } from './route.entity';
import { Geometry, LineString, Point, Polygon } from 'geojson';

@Entity('point')
export class PointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  description: string;

  @Column('geometry', { nullable: true })
  shape: Geometry;

  @ManyToOne(
    type => RouteEntity,
    route => route.points,
    { onDelete: 'CASCADE' },
  )
  route: RouteEntity;

  @Column()
  routeId: number;
}
