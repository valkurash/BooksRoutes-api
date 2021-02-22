import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';

import { ResponseInterceptor } from '../../filters/responseInterceptor';
import { PointService } from '../point/point.service';
import { PointEntity } from '../route/entities/point.entity';
import { CountryEntity } from '../dictionaries/entities/country.entity';
import { CountryService } from './country.service';

@Crud({
  model: {
    type: CountryEntity,
  },
})
@ApiTags('country')
@Controller('country')
@UseInterceptors(ResponseInterceptor)
export default class CountryController
  implements CrudController<CountryEntity> {
  constructor(public service: CountryService) {}
}
