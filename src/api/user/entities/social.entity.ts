import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { SocialType } from './socialType';

@Entity('social')
export class SocialEntity {
  @PrimaryColumn()
  socialId: string;

  @Column({
    type: 'enum',
    enum: SocialType,
  })
  type: SocialType;

  @ManyToOne(
    type => UserEntity,
    user => user.socials,
  )
  user: UserEntity;

  @Column()
  userId: number;
}
