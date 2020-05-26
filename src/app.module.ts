import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './api/book/entities/book.entity';
import { AuthorEntity } from './api/author/entities/author.entity';
import { RouteEntity } from './api/route/entities/route.entity';
import { LanguageEntity } from './api/dictionaries/entities/language.entity';
import { PointEntity } from './api/route/entities/point.entity';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { CountryEntity } from './api/dictionaries/entities/country.entity';
import { UserEntity } from './api/user/entities/user.entity';
import { UserModule } from './api/user/user.module';
import { SocialEntity } from './api/user/entities/social.entity';
import { ImageEntity } from './api/image/entities/image.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT, 10),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        BookEntity,
        RouteEntity,
        PointEntity,
        AuthorEntity,
        CountryEntity,
        LanguageEntity,
        UserEntity,
        SocialEntity,
        ImageEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    ApiModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
