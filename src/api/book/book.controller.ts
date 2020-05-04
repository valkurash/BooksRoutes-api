import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { BookEntity } from './entities/book.entity';
import { BookService } from './book.service';

@Crud({
  model: {
    type: BookEntity,
  },
  routes: {},
  query: {
    join: {
      authors: {
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
