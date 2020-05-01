import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { BookEntity } from '../../entities/book.entity';
import { RouteEntity } from '../../entities/route.entity';
import { RouteService } from './route.service';

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
export default class RouteController implements CrudController<RouteEntity> {
  constructor(public service: RouteService) {}
}
