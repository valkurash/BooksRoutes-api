import {
  Get,
  Controller,
  Render,
  Param,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { WpostsService } from './wposts.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import MiniPostDto from './dtos/miniPost.dto';
import { ResponseInterceptor } from '../../filters/responseInterceptor';

@ApiTags('posts')
@Controller('posts')
export default class WpostsController {
  constructor(private readonly wpostsService: WpostsService) {}

  @ApiOperation({ summary: 'Получение постов' })
  @Get('/:limit/:offset')
  @UseInterceptors(ResponseInterceptor)
  public async getPosts(
    @Param('limit') limit,
    @Param('offset') offset,
  ): Promise<MiniPostDto[]> {
    const payload = await this.wpostsService.getPosts(limit, offset);

    return payload;
  }

  // @ApiOperation({ summary: 'Получение поста' })
  // @Get('/:id')
  // public async get(@Param('id') id): Promise<FullPostDto> {
  //   const payload = await this.wpostsService.getPost(id);
  //
  //   return payload;
  // }

  @ApiOperation({ summary: 'Получение html страницы поста' })
  @Get('/:id')
  public async getBlogPost(@Param('id') id, @Res() res: Response) {
    const payload = await this.wpostsService.getPost(id);
    return res.render('blogPost', {
      message: payload.content,
    });
  }
}
