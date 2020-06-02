import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsInt, Min, Max } from 'class-validator';

export class RateBookRequest {
  @ApiModelProperty()
  bookId: number;

  @ApiModelProperty()
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
}
