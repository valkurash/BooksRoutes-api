import { ApiTags } from '@nestjs/swagger';
import { Controller, UseInterceptors } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CrudController } from '@nestjsx/crud/lib/interfaces/crud-controller.interface';
import { ResponseInterceptor } from '../../filters/responseInterceptor';
import { LanguageService } from './language.service';
import { LanguageEntity } from '../dictionaries/entities/language.entity';

@Crud({
  model: {
    type: LanguageEntity,
  },
})
@ApiTags('language')
@Controller('language')
@UseInterceptors(ResponseInterceptor)
export default class LanguageController
  implements CrudController<LanguageEntity> {
  constructor(public service: LanguageService) {}
}
