import { Exclude, Expose, Type } from 'class-transformer';
import { Pagination } from '../../../base/pagination.base';
import { AuthorDto } from '../dto/author.dto';

export default class AuthorsPagination extends Pagination {
  @Expose()
  @Type(() => AuthorDto)
  data: AuthorDto[];
}
