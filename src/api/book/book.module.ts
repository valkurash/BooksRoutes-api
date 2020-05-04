import { Module } from '@nestjs/common';
import { LanguageEntity } from '../dictionaries/entities/language.entity';
import { AuthorEntity } from '../author/entities/author.entity';
import { PointEntity } from '../route/entities/point.entity';
import { RouteEntity } from '../route/entities/route.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BookService } from './book.service';
import BookController from './book.controller';
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
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
