import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma';
import { SendMessageDto } from './dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(dto: SendMessageDto) {
    const { text } = dto;
    const message = await this.prisma.message.create({ data: { text } });
    return message;
  }
}
