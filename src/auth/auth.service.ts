import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { StringValue } from 'ms';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequestDto } from './dto/login.dto';
import { SignupRequestDto } from './dto/signup.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET: string;
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_SECRET = configService.getOrThrow<string>('JWT_SECRET');
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
  }

  private async generateTokens(id: string) {
    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });
    return { accessToken, refreshToken };
  }

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
    const user = await this.prisma.user.create({
      data: { name, email, password: await hash(password) },
    });
    return this.generateTokens(user.id);
  }

  async login(dto: LoginRequestDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
    if (!user || !(await verify(user.password, password)))
      throw new UnauthorizedException('Invalid email or password');
    return this.generateTokens(user.id);
  }
}
