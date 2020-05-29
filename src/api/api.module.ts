import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { AuthorModule } from './author/author.module';
import { FixerModule } from './fixer/fixer.module';

@Module({
  imports: [
    BookModule,
    AuthorModule,
    RouteModule,
    UserModule,
    AuthModule,
    ImageModule,
    FixerModule,
  ],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {}
}
