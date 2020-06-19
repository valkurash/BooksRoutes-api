import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class RecoverPasswordRequest {
  @ApiModelProperty()
  email: string;
}
