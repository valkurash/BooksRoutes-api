import { Expose, Type } from 'class-transformer';

export abstract class Pagination {
  @Expose()
  count: number;

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  pageCount: number;
}
