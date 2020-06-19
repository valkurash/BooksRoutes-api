import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class ConfirmEmailRequest {
  @ApiModelProperty()
  email: string;
  @ApiModelProperty()
  code: string;
}
