import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class RegisterRequestDto {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  password: string;
}
