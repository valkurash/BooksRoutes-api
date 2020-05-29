import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import WpostsController from './wposts.controller';
import { WpostsService } from './wposts.service';

@Module({
  controllers: [WpostsController],
  providers: [WpostsService],
})
export class WpostsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    return;
  }
}
