import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '../generated/prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { text, rating, movieId } = dto;
    return await this.prisma.review.create({
      data: { text, rating, movie: { connect: { id: movieId } } },
    });
  }
}
