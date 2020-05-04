import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import RouteController from './route.controller';
import { LanguageEntity } from '../dictionaries/entities/language.entity';
import { AuthorEntity } from '../author/entities/author.entity';
import { PointEntity } from './entities/point.entity';
import { RouteEntity } from './entities/route.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { CountryEntity } from '../dictionaries/entities/country.entity';

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
  providers: [RouteService],
  controllers: [RouteController],
})
export class RouteModule {}
