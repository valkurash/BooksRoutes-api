import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { ImageEntity } from '../image/entities/image.entity';
import { ImportService } from './import.service';
import ImportController from './import.controller';
import { RouteEntity } from '../route/entities/route.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RouteEntity, BookEntity])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    return;
  }
}
