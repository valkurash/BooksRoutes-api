import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { SocialType } from '../entities/socialType';

export default class RegisterRequestDto {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
  @ApiModelProperty()
  socialType?: SocialType;
  @ApiModelProperty()
  socialId?: string;
  @ApiModelProperty()
  avatar?: string;
  @ApiModelProperty()
  displayName?: string;
}
