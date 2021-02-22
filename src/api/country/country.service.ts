import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CountryEntity } from '../dictionaries/entities/country.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<CountryEntity> {
  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryEntityRepository: Repository<CountryEntity>,
  ) {
    super(countryEntityRepository);
  }
}
