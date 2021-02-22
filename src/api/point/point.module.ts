import { Module } from '@nestjs/common';
import { LanguageEntity } from '../dictionaries/entities/language.entity';
import { AuthorEntity } from '../author/entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { CountryEntity } from '../dictionaries/entities/country.entity';
import { PointService } from './point.service';
import { RouteEntity } from '../route/entities/route.entity';
import { PointEntity } from '../route/entities/point.entity';
import PointController from './point.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookEntity,
      RouteEntity,
      PointEntity,
      AuthorEntity,
      CountryEntity,
      LanguageEntity,
    ]),
  ],
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
