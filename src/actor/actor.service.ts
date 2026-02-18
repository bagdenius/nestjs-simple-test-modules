import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Actor } from '../generated/prisma/client';

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateActorDto): Promise<Actor> {
    const { name } = dto;
    const actor = await this.prisma.actor.create({ data: { name } });
    return actor;
  }
}
