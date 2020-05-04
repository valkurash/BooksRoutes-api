import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { RouteEntity } from './entities/route.entity';

@Injectable()
export class RouteService extends TypeOrmCrudService<RouteEntity> {
  constructor(
    @InjectRepository(RouteEntity)
    private readonly routeRepository: Repository<RouteEntity>,
  ) {
    super(routeRepository);
  }
}
