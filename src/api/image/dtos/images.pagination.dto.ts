import { Exclude, Expose, Type } from 'class-transformer';
import { ImageDto } from './image.dto';
import { Pagination } from '../../../base/pagination.base';

export default class ImagesPagination extends Pagination {
  @Expose()
  @Type(() => ImageDto)
  data: ImageDto[];
}
