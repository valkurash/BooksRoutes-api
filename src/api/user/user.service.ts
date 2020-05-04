import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import UserDto from './dtos/user.dto';
import UserWithPasswordDto from './dtos/userWithPassword.dto';
import RegisterRequestDto from './dtos/register.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async validateUser(email: string, attempt: string): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne({ email });
    if (findedUser) {
      const compared = await findedUser.comparePassword(attempt);
      if (compared) {
        return UserDto.convertFromEntityToDto(findedUser);
      } else {
        return null;
      }
    }
    return null;
  }

  public async findOne(email: string): Promise<UserDto> {
    const findedUser = await this.userRepository.findOne({ email });
    if (findedUser) {
      return UserDto.convertFromEntityToDto(findedUser);
    }
    return null;
  }

  public async createUser(
    createUserRequest: RegisterRequestDto,
  ): Promise<UserDto> {
    const userEntity = new UserEntity();
    userEntity.password = createUserRequest.password;
    userEntity.email = createUserRequest.email;
    const createdUser = await this.userRepository.save(userEntity);
    return UserDto.convertFromEntityToDto(createdUser);
  }
}
