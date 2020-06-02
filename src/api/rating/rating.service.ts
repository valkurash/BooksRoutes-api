import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookrateEntity } from './entity/bookrate.entity';
import { addZeroes } from '../../utils/utils';
import { AuthorrateEntity } from './entity/authorrate.entity';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(BookrateEntity)
    private readonly bookRateRepository: Repository<BookrateEntity>,
    @InjectRepository(AuthorrateEntity)
    private readonly authorRateRepository: Repository<BookrateEntity>,
  ) {}

  public async addBookRating(
    userId: number,
    bookId: number,
    rating: number,
  ): Promise<boolean> {
    const likeEntity = new BookrateEntity();
    likeEntity.userId = userId;
    likeEntity.bookId = bookId;
    likeEntity.rating = rating;
    const result = await this.bookRateRepository.save(likeEntity);
    return true;
  }

  public async addAuthorRating(
    userId: number,
    autorId: number,
    rating: number,
  ): Promise<boolean> {
    const likeEntity = new AuthorrateEntity();
    likeEntity.userId = userId;
    likeEntity.authorId = autorId;
    likeEntity.rating = rating;
    const result = await this.authorRateRepository.save(likeEntity);
    return true;
  }

  public async getBookRating(bookId: number): Promise<number> {
    const rating = await this.bookRateRepository
      .createQueryBuilder('bookrate')
      .select('AVG(bookrate.rating)', 'rating')
      .where(`bookrate.bookId=${bookId}`)
      .getRawOne();
    if (rating.rating) {
      const value = parseFloat(rating.rating);
      return value;
    } else {
      return 0;
    }
  }

  public async getAuthorRating(authorId: number): Promise<number> {
    const rating = await this.authorRateRepository
      .createQueryBuilder('authorrate')
      .select('AVG(authorrate.rating)', 'rating')
      .where(`authorrate.authorId=${authorId}`)
      .getRawOne();
    if (rating.rating) {
      const value = parseFloat(rating.rating);
      return value;
    } else {
      return 0;
    }
  }
}
