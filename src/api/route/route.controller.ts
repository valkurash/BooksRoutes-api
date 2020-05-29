import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { BookEntity } from '../book/entities/book.entity';
import { RouteEntity } from './entities/route.entity';
import { RouteService } from './route.service';
import { ResponseInterceptor } from '../../filters/responseInterceptor';

@Crud({
  model: {
    type: BookEntity,
  },
  routes: {},
  query: {
    join: {
      book: {
        eager: false,
      },
      points: {
        eager: false,
      },
    },
  },
})
@ApiTags('route')
@Controller('route')
@UseInterceptors(ResponseInterceptor)
export default class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) {}
}
