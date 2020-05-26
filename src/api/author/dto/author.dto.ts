import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ImageDto } from '../../image/dtos/image.dto';
import * as moment from 'moment';
import { BookDto } from '../../book/dtos/book.dto';

@Exclude()
export class AuthorDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  wiki?: string;

  @Expose()
  description?: string;
  @Expose()
  @Type(() => ImageDto)
  avatar?: ImageDto;
  @Expose()
  @Transform(value => {
    if (!value) {
      return value;
    }
    const mom = moment(value, 'DD.MM.YYYY');
    const result = mom.format('DD.MM.YYYY');
    return result;
  })
  birthdate: Date;
  @Expose()
  @Transform(value => {
    if (!value) {
      return value;
    }
    const mom = moment(value, 'DD.MM.YYYY');
    const result = mom.format('DD.MM.YYYY');
    return result;
  })
  dateOfDeath: Date;

  @Expose()
  @Type(() => BookDto)
  books: BookDto[];
}
