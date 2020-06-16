import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import UserController from './user.controller';
import { SocialEntity } from './entities/social.entity';
import { EventModule } from '../../event/event.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, SocialEntity]), EventModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
