import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { BookEntity } from '../../entities/book.entity';
import { BookService } from './book.service';

@Crud({
  model: {
    type: BookEntity,
  },
})
@ApiTags('book')
@Controller('book')
export default class BookController implements CrudController<BookEntity> {
  constructor(public service: BookService) {}
}
