import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from '../../filters/responseInterceptor';
import JwtUserPayload, { UserPayload } from '../auth/dto/jwtUserPayload.dto';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { User } from '../../guards/user.decorator';
import { RatingService } from './rating.service';
import { RateBookRequest } from './dto/rateBook.request.dto';
import { RateAuthorRequest } from './dto/rateAuthor.request.dto';

@ApiTags('rating')
@Controller('rating')
@UseInterceptors(ResponseInterceptor)
export default class RatingController {
  constructor(public service: RatingService) {}

  @ApiOperation({ summary: 'Оценить книгу' })
  @UseGuards(JwtAuthGuard)
  @Post('/book')
  public async likeBook(
    @User() user: UserPayload,
    @Body() request: RateBookRequest,
  ): Promise<boolean> {
    return this.service.addBookRating(
      user.userId,
      request.bookId,
      request.rating,
    );
  }

  @ApiOperation({ summary: 'Оценить автора' })
  @UseGuards(JwtAuthGuard)
  @Post('/author')
  public async likeAuthor(
    @User() user: UserPayload,
    @Body() request: RateAuthorRequest,
  ): Promise<boolean> {
    return this.service.addAuthorRating(
      user.userId,
      request.authorId,
      request.rating,
    );
  }

  @ApiOperation({ summary: 'Получить  рейтинг автора' })
  @Get('/author/:authorId')
  public async getAuthorRating(
    @Param('authorId') authorId: string,
  ): Promise<number> {
    return this.service.getAuthorRating(parseInt(authorId));
  }

  @ApiOperation({ summary: 'Получить  рейтинг книги' })
  @Get('/book/:bookId')
  public async getBookRating(@Param('bookId') bookId: string): Promise<number> {
    return this.service.getBookRating(parseInt(bookId));
  }
}
