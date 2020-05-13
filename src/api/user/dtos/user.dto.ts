import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { UserEntity } from '../entities/user.entity';

export default class UserDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  avatar: string;
  @ApiModelProperty()
  displayName: string;

  public static convertFromEntityToDto(entity: UserEntity): UserDto {
    const userDto = new UserDto();
    userDto.id = entity.id;
    userDto.email = entity.email;
    userDto.avatar = entity.avatar;
    userDto.displayName = entity.displayName;
    return userDto;
  }
}
