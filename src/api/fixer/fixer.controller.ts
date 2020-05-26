import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { FixerService } from './fixer.service';

@ApiTags('fixer')
@Controller('fixer')
export default class FixerController {
  constructor(private readonly fixerService: FixerService) {}

  @Get('/fiximages')
  async fiximages() {
    //const payload = await this.fixerService.fixImages();
    return null;
  }
}
