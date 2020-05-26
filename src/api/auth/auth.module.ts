import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/login/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import AuthController from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './strategies/login/jwt.strategy';
import { FacebookLoginStrategy } from './strategies/login/facebook.login.strategy';
import { VkontakteStrategy } from './strategies/login/vk.login.strategy';
import { GoogleLoginStrategy } from './strategies/login/google.login.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    FacebookLoginStrategy,
    VkontakteStrategy,
    GoogleLoginStrategy,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    return;
  }
}
