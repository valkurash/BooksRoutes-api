import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryEntity } from '../dictionaries/entities/country.entity';
import CountryController from './country.controller';
import { CountryService } from './country.service';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  providers: [CountryService],
  controllers: [CountryController],
})
export class CountryModule {}
