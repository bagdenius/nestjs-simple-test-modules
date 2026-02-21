import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma';
import { ArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({ where: { id } });
    if (!artist) throw new NotFoundException('Artist not found');
    return artist;
  }

  async create(dto: ArtistDto) {
    const { name, genre } = dto;
    return await this.prisma.artist.create({ data: { name, genre } });
  }
}
