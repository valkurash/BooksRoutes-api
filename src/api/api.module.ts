import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { RouteModule } from './route/route.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [BookModule, RouteModule, UserModule, AuthModule],
})
export class ApiModule {}
