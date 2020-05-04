import UserDto from './user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from '../entities/user.entity';

export default class UserWithPasswordDto extends UserDto {
  @ApiModelProperty()
  password: string;

  public static convertFromEntityToDto(
    entity: UserEntity,
  ): UserWithPasswordDto {
    const userDto = UserDto.convertFromEntityToDto(entity);
    const userWithPassword: UserWithPasswordDto = {
      ...userDto,
      password: entity.password,
    };
    return userWithPassword;
  }
}
