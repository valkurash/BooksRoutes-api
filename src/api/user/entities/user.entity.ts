import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import UserDto from '../dtos/user.dto';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  confirmed: boolean;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  public async comparePassword(attempt: string): Promise<boolean> {
    const compareResult = await bcrypt.compare(attempt, this.password);
    return compareResult;
  }

  public static convertEntityToDto(entity: UserEntity): UserDto {
    const dto = new UserDto();
    dto.email = entity.email;
    dto.id = entity.id;
    return dto;
  }
}
