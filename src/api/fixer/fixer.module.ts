import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import FixerController from './fixer.controller';
import { FixerService } from './fixer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../book/entities/book.entity';
import { ImageEntity } from '../image/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, ImageEntity])],
  controllers: [FixerController],
  providers: [FixerService],
})
export class FixerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    return;
  }
}
