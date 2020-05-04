import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class LoginRequestDto {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}
