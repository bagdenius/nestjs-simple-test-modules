import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { MovieRequestDto } from './dto/movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.movie.findMany({
      select: {
        id: true,
        title: true,
        actors: { select: { id: true, name: true } },
      },
      take: 20,
      where: { isAvailable: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: { poster: true, actors: true, reviews: true },
    });
    if (!movie || !movie.isAvailable)
      throw new NotFoundException('Movie not found');
    return movie;
  }

  async create(dto: MovieRequestDto): Promise<Movie> {
    const { title, releaseYear, actorIds, imageUrl } = dto;
    const actors = await this.prisma.actor.findMany({
      where: { id: { in: actorIds } },
    });
    if (!actors || !actors.length)
      throw new NotFoundException('No actors found on this movie');
    return await this.prisma.movie.create({
      data: {
        title,
        releaseYear,
        poster: imageUrl ? { create: { url: imageUrl } } : undefined,
        actors: { connect: actors.map((actor) => ({ id: actor.id })) },
      },
    });
  }

  async update(id: string, dto: MovieRequestDto): Promise<Movie> {
    const { title, releaseYear, imageUrl } = dto;
    const movie = await this.findById(id);
    const actors = await this.prisma.actor.findMany({
      where: { id: { in: dto.actorIds } },
    });
    if (!actors || !actors.length)
      throw new NotFoundException('No actors found on this movie');
    return await this.prisma.movie.update({
      where: { id: movie.id },
      data: {
        title,
        releaseYear,
        poster: imageUrl ? { create: { url: imageUrl } } : undefined,
        actors: { connect: actors.map((actor) => ({ id: actor.id })) },
      },
    });
  }

  async delete(id: string): Promise<string> {
    const movie = await this.findById(id);
    return (await this.prisma.movie.delete({ where: { id: movie.id } })).id;
  }
}
