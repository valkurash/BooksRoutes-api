import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import MiniPostDto from './miniPost.dto';

export default class FullPostDto extends MiniPostDto {
  @ApiModelProperty()
  content: string;

  public static convertFromDynamicWp(data: any): FullPostDto {
    const fullPostDto = new FullPostDto();
    fullPostDto.id = data.id;
    fullPostDto.date = data.date;
    fullPostDto.link = data.link;
    fullPostDto.title = data.title?.rendered;
    fullPostDto.description = data.excerpt.rendered;
    fullPostDto.imageUrl = data.jetpack_featured_media_url;
    fullPostDto.content = data.content.rendered;
    return fullPostDto;
  }
}
