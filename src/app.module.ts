import { config } from 'dotenv';
config();
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './api/entities/book.entity';
import { AuthorEntity } from './api/entities/author.entity';
import { RouteEntity } from './api/entities/route.entity';
import { CountryEntity } from './api/entities/country.entity';
import { LanguageEntity } from './api/entities/language.entity';
import { PointEntity } from './api/entities/point.entity';
import { ApiModule } from './api/api.module';

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
      ],
      synchronize: true,
      logging: true,
    }),
    ApiModule,
  ],
})
export class AppModule {}
