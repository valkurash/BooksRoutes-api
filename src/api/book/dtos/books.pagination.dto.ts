import { Exclude, Expose, Type } from 'class-transformer';
import { Pagination } from '../../../base/pagination.base';
import { BookDto } from './book.dto';

export default class BooksPagination extends Pagination {
  @Expose()
  @Type(() => BookDto)
  data: BookDto[];
}
