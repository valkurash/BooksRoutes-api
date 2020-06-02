import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('bookrate')
export class BookrateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => BookEntity,
    book => book.id,
  )
  book: BookEntity;

  @Column({ nullable: false })
  rating: number;

  @ManyToOne(
    type => UserEntity,
    user => user.id,
  )
  user: UserEntity;

  @Column()
  userId: number;

  @Column()
  bookId: number;
}
