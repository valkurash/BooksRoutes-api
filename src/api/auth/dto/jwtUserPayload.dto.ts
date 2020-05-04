import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserPayload {
  @ApiModelProperty()
  userId: number;
  @ApiModelProperty()
  email: string;
}

export default class JwtUserPayload {
  @ApiModelProperty()
  jwtToken: string;
  @ApiModelProperty()
  userPayload: UserPayload;
}
