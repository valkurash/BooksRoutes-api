import { Module } from '@nestjs/common';
import { WpostsModule } from './posts/wposts.module';

@Module({
  imports: [WpostsModule],
})
export class WordpressModule {}
