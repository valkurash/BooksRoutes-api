import { Exclude, Expose, Type } from 'class-transformer';
import { ImageDto } from '../../image/dtos/image.dto';
import { AuthorDto } from '../../author/dto/author.dto';

@Exclude()
export class CountryDto {
  @Expose()
  id: number;

  @Expose()
  iso: string;

  @Expose()
  ru_name: string;

  @Expose()
  en_name: string;

  @Expose()
  iso3: string;

  @Expose()
  numcode: string;

  @Expose()
  phonecode: string;
}
