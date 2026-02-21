import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<UserModel[]> {
    return await this.prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
  }
}
