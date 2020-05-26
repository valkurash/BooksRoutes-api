import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorService extends TypeOrmCrudService<AuthorEntity> {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorEntityRepository: Repository<AuthorEntity>,
  ) {
    super(authorEntityRepository);
  }
}
