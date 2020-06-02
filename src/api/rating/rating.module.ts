import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookrateEntity } from './entity/bookrate.entity';
import { RatingService } from './rating.service';
import RatingController from './rating.controller';
import { AuthorrateEntity } from './entity/authorrate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookrateEntity, AuthorrateEntity])],
  providers: [RatingService],
  controllers: [RatingController],
})
export class RatingModule {}
