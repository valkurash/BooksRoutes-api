import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ImageType } from '../entities/imageType.enum';

@Exclude()
export class ImageDto {
  @Expose()
  id?: number;
  @Expose()
  name: string;
  @Expose()
  @Transform(value => {
    //ToDo костыль, так как конвертация в class вызывается дважды, а getter функции не работает
    if (!value.toString().includes(process.env.IMAGE_HOST)) {
      return `${process.env.IMAGE_HOST}/${value}`;
    } else {
      return value;
    }
  })
  url: string;
  @Expose()
  type: ImageType;
}
