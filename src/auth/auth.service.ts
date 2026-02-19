import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignupRequestDto } from './dto/signup.dto';
import { hash } from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: SignupRequestDto) {
    const { name, email, password } = dto;

    const existUser = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true },
    });
    if (existUser)
      throw new ConflictException(
        'User with provided email already registered',
      );

    const user = this.prisma.user.create({
      data: { name, email, password: await hash(password) },
    });
    return user;
  }
}
