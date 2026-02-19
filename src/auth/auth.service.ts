import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import type { Request, Response } from 'express';
import ms, { type StringValue } from 'ms';
import { PrismaService } from '../prisma/prisma.service';
import { isDev } from '../utils/isDev.util';
import type { LoginRequestDto } from './dto/login.dto';
import type { SignupRequestDto } from './dto/signup.dto';
import type { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );
    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  private setCookie(response: Response, value: string, expires: Date) {
    response.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: !isDev(this.configService),
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }

  async refresh(request: Request, response: Response) {
    const refreshToken = request.cookies.refreshToken;
    if (!refreshToken) throw new UnauthorizedException('Invalid refresh token');
    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);
    if (payload) {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: { id: true },
      });
      if (!user) throw new NotFoundException('User not found');
      return this.auth(response, user.id);
    }
  }

  private auth(response: Response, id: string) {
    const { accessToken, refreshToken } = this.generateTokens(id);
    this.setCookie(
      response,
      refreshToken,
      new Date(Date.now() + ms(this.JWT_REFRESH_TOKEN_TTL)),
    );
    return { accessToken };
  }

  private generateTokens(id: string) {
    const payload: JwtPayload = { id };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });
    return { accessToken, refreshToken };
  }

  async signup(response: Response, dto: SignupRequestDto) {
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
    return this.auth(response, user.id);
  }

  async login(response: Response, dto: LoginRequestDto) {
    const { email, password } = dto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
    if (!user || !(await verify(user.password, password)))
      throw new UnauthorizedException('Invalid email or password');
    return this.auth(response, user.id);
  }

  async logout(response: Response) {
    this.setCookie(response, 'refreshToken', new Date(0));
    return true;
  }
}
