import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export default class MiniPostDto {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  date: string;
  @ApiModelProperty()
  link: string;
  @ApiModelProperty()
  title: string;
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  imageUrl: string;

  public static convertFromDynamicWp(data: any): MiniPostDto {
    const miniPost = new MiniPostDto();
    miniPost.id = data.id;
    miniPost.date = data.date;
    miniPost.link = data.link;
    miniPost.title = data.title?.rendered;
    miniPost.description = data.excerpt.rendered;
    miniPost.imageUrl = data.jetpack_featured_media_url;
    return miniPost;
  }
}
