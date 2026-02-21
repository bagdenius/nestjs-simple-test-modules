import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { CreateLinkDto } from './dto';
import { PrismaService } from '../../infra/prisma';

@Injectable()
export class LinkService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async create(dto: CreateLinkDto, userId: string) {
    const { originalUrl } = dto;
    const shortCode = randomBytes(5).toString('hex');
    const link = await this.prisma.link.create({
      data: { originalUrl, shortCode, user: { connect: { id: userId } } },
    });
    return {
      url: `${this.configService.getOrThrow<string>('APP_URL')}/v1/${link.shortCode}`,
    };
  }

  async delete(id: string) {
    const link = await this.prisma.link.findUnique({ where: { id } });
    if (!link) throw new NotFoundException('Link not found');
    await this.prisma.link.delete({ where: { id: link.id } });
    return true;
  }
}
