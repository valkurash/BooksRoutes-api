import { Module } from '@nestjs/common';
import { BookService } from './services/book/book.service';
import BookController from './services/book/book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { RouteEntity } from './entities/route.entity';
import { PointEntity } from './entities/point.entity';
import { AuthorEntity } from './entities/author.entity';
import { CountryEntity } from './entities/country.entity';
import { LanguageEntity } from './entities/language.entity';
import { RouteService } from './services/route/route.service';
import RouteController from './services/route/route.controller';

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
  providers: [BookService, RouteService],
  controllers: [BookController, RouteController],
})
export class ApiModule {}
