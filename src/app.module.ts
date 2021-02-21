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
import { CountryEntity } from './api/dictionaries/entities/country.entity';
import { UserEntity } from './api/user/entities/user.entity';
import { SocialEntity } from './api/user/entities/social.entity';
import { ImageEntity } from './api/image/entities/image.entity';
import { WpostsModule } from './wordpress/posts/wposts.module';
import { BookrateEntity } from './api/rating/entity/bookrate.entity';
import { AuthorrateEntity } from './api/rating/entity/authorrate.entity';
import { EventModule } from './event/event.module';
import { ImportModule } from './api/import/import.module';

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
        BookrateEntity,
        AuthorrateEntity,
      ],
      synchronize: true,
      logging: true,
    }),
    ApiModule,
    EventModule,
    WpostsModule,
    ImportModule,
  ],
})
export class AppModule {}
