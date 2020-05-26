import { Exclude, Expose, Type } from 'class-transformer';
import { ImageDto } from '../../image/dtos/image.dto';
import { AuthorDto } from '../../author/dto/author.dto';
import { RouteDto } from '../../route/dto/route.dto';

@Exclude()
export class BookDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  isbn?: string;

  @Expose()
  cover?: string;

  @Expose()
  description: string;

  @Expose()
  moderated: boolean;

  @Expose()
  litres?: string;

  @Expose()
  ozon?: string;

  @Expose()
  @Type(() => ImageDto)
  coverImg: ImageDto;

  @Expose()
  @Type(() => RouteDto)
  routes: RouteDto[];

  @Expose()
  @Type(() => AuthorDto)
  authors: AuthorDto[];
}
