import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImportService } from './import.service';
import { ResponseInterceptor } from '../../filters/responseInterceptor';

@ApiTags('import')
@Controller('import')
@UseInterceptors(ResponseInterceptor)
export default class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('/:bookId/:mid')
  async fiximages(@Param() params) {
    return this.importService.importKml(params.bookId, params.mid);
  }
}
