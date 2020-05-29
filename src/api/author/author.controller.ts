import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudAuth } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { AuthorEntity } from './entities/author.entity';
import { AuthorService } from './author.service';
import AuthorsPagination from './entities/authors.pagination.dto';
import { AuthorDto } from './dto/author.dto';
import { ResponseInterceptor } from '../../filters/responseInterceptor';

@Crud({
  model: {
    type: AuthorEntity,
  },
  serialize: {
    getMany: AuthorsPagination,
    get: AuthorDto,
  },
  query: {
    join: {
      avatar: {
        eager: true,
      },
      books: {
        eager: false,
      },
      'books.coverImg': {
        eager: false,
      },
    },
  },
})
@ApiTags('author')
@Controller('author')
@UseInterceptors(ResponseInterceptor)
export default class AuthorController implements CrudController<AuthorEntity> {
  constructor(public service: AuthorService) {}
}
