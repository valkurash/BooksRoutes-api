import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { LanguageEntity } from '../dictionaries/entities/language.entity';

@Injectable()
export class LanguageService extends TypeOrmCrudService<LanguageEntity> {
  constructor(
    @InjectRepository(LanguageEntity)
    private readonly languageEntityRepository: Repository<LanguageEntity>,
  ) {
    super(languageEntityRepository);
  }
}
