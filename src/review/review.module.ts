import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { MovieService } from '../movie/movie.service';
import { MovieEntity } from '../movie/entities/movie.entity';
import { ActorEntity } from '../actor/entities/actor.entity';
import { MoviePosterEntity } from '../movie/entities/movie-poster.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReviewEntity,
      MovieEntity,
      MoviePosterEntity,
      ActorEntity,
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService, MovieService],
})
export class ReviewModule {}
