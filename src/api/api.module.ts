import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [BookModule, RouteModule, UserModule, AuthModule, ImageModule],
})
export class ApiModule {}
