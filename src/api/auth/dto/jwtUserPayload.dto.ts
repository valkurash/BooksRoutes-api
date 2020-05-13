import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import UserDto from '../../user/dtos/user.dto';

export class UserPayload {
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  avatar: string;

  @ApiModelProperty()
  displayName: string;

  public static createFromUserDto(user: UserDto): UserPayload {
    const userPayload: UserPayload = {
      userId: user.id,
      email: user.email,
      avatar: user.avatar,
      displayName: user.displayName,
    };
    return userPayload;
  }
}

export default class JwtUserPayload {
  @ApiModelProperty()
  jwtToken: string;
  @ApiModelProperty()
  userPayload: UserPayload;
}
