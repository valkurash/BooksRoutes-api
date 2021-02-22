import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';

import { ResponseInterceptor } from '../../filters/responseInterceptor';
import { PointService } from '../point/point.service';
import { PointEntity } from '../route/entities/point.entity';

@Crud({
  model: {
    type: PointEntity,
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
@ApiTags('point')
@Controller('point')
@UseInterceptors(ResponseInterceptor)
export default class PointController implements CrudController<PointEntity> {
  constructor(public service: PointService) {}
}
