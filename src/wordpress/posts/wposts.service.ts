import { Injectable } from '@nestjs/common';
import * as Wpapi from 'wpapi';
import MiniPostDto from './dtos/miniPost.dto';
import FullPostDto from './dtos/fullPost.dto';

@Injectable()
export class WpostsService {
  private url: string;
  private wpapi: Wpapi;

  constructor() {
    this.wpapi = new Wpapi({
      endpoint: 'https://blog.booksroutes.info/wp-json',
    });
  }

  public async getPosts(limit: number, offset: number): Promise<MiniPostDto[]> {
    try {
      const result = await this.wpapi
        .posts()
        .context('embed')
        .order('desc')
        .orderby('date')
        .embed()
        .perPage(limit)
        .offset(offset);
      return result.map(post => MiniPostDto.convertFromDynamicWp(post));
    } catch (e) {
      console.log(e);
    }
  }

  public async getPost(id: number): Promise<FullPostDto> {
    try {
      const result = await this.wpapi.posts().id(id);
      return FullPostDto.convertFromDynamicWp(result);
    } catch (e) {
      console.log(e);
    }
  }
}
