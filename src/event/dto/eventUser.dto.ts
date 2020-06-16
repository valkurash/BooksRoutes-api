import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class EventUserDto {
  @ApiModelProperty()
  email: string;

  @ApiModelProperty()
  phone: string;

  @ApiModelProperty()
  login: string;

  @ApiModelProperty()
  userId: string;
}
