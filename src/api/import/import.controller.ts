import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImportService } from './import.service';

@ApiTags('import')
@Controller('import')
export default class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('/import/:id')
  async fiximages(@Param() params) {
    return this.importService.importKml(params.id);
  }
}
