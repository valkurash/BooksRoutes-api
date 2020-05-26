import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { BookEntity } from './entities/book.entity';
import { BookService } from './book.service';
import BooksPagination from './dtos/books.pagination.dto';
import { BookDto } from './dtos/book.dto';

@Crud({
  model: {
    type: BookEntity,
  },
  serialize: {
    getMany: BooksPagination,
    get: BookDto,
  },
  routes: {},
  query: {
    join: {
      authors: {
        eager: true,
        exclude: ['description', 'wiki', 'birthdate', 'dateOfDeath'],
      },
      'authors.avatar': {
        eager: true,
      },
      coverImg: {
        eager: true,
      },
      routes: {
        eager: false,
      },
      'routes.countries': {
        eager: false,
      },
      'routes.languages': {
        eager: false,
      },
      'routes.points': {
        eager: false,
      },
    },
  },
})
@ApiTags('book')
@Controller('book')
export default class BookController implements CrudController<BookEntity> {
  constructor(public service: BookService) {}
}
