import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SocialEntity } from './social.entity';
import { BookrateEntity } from '../../rating/entity/bookrate.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  displayName: string;

  @Column({ default: false })
  confirmed: boolean;

  @Column({ nullable: true })
  confirmationCode?: number;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(
    type => SocialEntity,
    social => social.user,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  socials: SocialEntity[];

  @OneToMany(
    type => BookrateEntity,
    like => like.user,
  )
  likes: BookrateEntity[];

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.hash();
    }
  }

  public async hash() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    const compareResult = await bcrypt.compare(attempt, this.password);
    return compareResult;
  }
}
