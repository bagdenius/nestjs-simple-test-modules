import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendMessageDto } from './send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(dto: SendMessageDto) {
    const { text } = dto;
    const message = await this.prisma.message.create({ data: { text } });
    return message;
  }
}
