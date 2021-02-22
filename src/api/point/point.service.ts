import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { PointEntity } from '../route/entities/point.entity';

@Injectable()
export class PointService extends TypeOrmCrudService<PointEntity> {
  constructor(
    @InjectRepository(PointEntity)
    private readonly pointRepository: Repository<PointEntity>,
  ) {
    super(pointRepository);
  }
}
