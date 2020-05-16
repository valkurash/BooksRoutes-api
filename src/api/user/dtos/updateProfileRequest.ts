import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class UpdateProfileRequest {
  @ApiModelProperty({ required: false })
  displayName?: string;
  @ApiModelProperty({ required: false })
  avatar: string;
}
