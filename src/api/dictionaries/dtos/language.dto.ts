import { Exclude, Expose, Type } from 'class-transformer';
import { ImageDto } from '../../image/dtos/image.dto';
import { AuthorDto } from '../../author/dto/author.dto';

@Exclude()
export class LanguageDto {
  @Expose()
  id: number;

  @Expose()
  ru_name: string;

  @Expose()
  en_name: string;

  @Expose()
  iso639: string;
}
