import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import type { LoginRequestDto } from './dto/login.dto';
import type { SignupRequestDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignupRequestDto,
  ) {
    return await this.authService.signup(response, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.authService.login(response, dto);
  }
}
