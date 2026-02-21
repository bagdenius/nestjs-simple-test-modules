import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes } from 'crypto';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { CreateLinkDto } from './dto';

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
      url: `${this.configService.getOrThrow<string>('APP_URL')}/${link.shortCode}`,
    };
  }
}
