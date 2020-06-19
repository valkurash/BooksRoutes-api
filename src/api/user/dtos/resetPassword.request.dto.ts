import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class ResetPasswordRequest {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  code: string;

  @ApiModelProperty()
  password: string;
}
