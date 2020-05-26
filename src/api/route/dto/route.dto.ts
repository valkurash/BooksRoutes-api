import { Exclude, Expose, Type } from 'class-transformer';
import { ImageDto } from '../../image/dtos/image.dto';
import { AuthorDto } from '../../author/dto/author.dto';
import { CountryDto } from '../../dictionaries/dtos/country.dto';
import { LanguageDto } from '../../dictionaries/dtos/language.dto';

@Exclude()
export class RouteDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  googlemymap?: string;

  @Expose()
  @Type(() => CountryDto)
  countries: CountryDto[];

  @Expose()
  @Type(() => AuthorDto)
  languages: LanguageDto[];
}
