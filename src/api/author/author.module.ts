import { Module } from '@nestjs/common';
import { AuthorEntity } from '../author/entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorService } from './author.service';
import AuthorController from './author.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
