import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BookEntity } from '../../book/entities/book.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { AuthorEntity } from '../../author/entities/author.entity';

@Entity('authorrate')
export class AuthorrateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => AuthorEntity,
    author => author.id,
  )
  author: AuthorEntity;

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
  authorId: number;
}
