import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import type { Request, Response } from 'express';
import type { User } from '../generated/prisma/client';
import { AuthService } from './auth.service';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { AuthResponse } from './dto/auth.dto';
import { LoginRequestDto } from './dto/login.dto';
import { SignupRequestDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User account registration',
    description: 'Creates a new user account and issues an access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({
    description: 'User with provided email already registered',
  })
  async signup(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: SignupRequestDto,
  ) {
    return await this.authService.signup(response, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User account login',
    description: 'Logging in into user account and issues an access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: LoginRequestDto,
  ) {
    return await this.authService.login(response, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User account logout',
    description:
      'Logging out user from an account and issues expired access token',
  })
  async logout(@Res({ passthrough: true }) response: Response) {
    return await this.authService.logout(response);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Access token refreshing',
    description:
      'Takes refresh token from user cookies and issues new access token',
  })
  @ApiOkResponse({ type: AuthResponse })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.refresh(request, response);
  }

  @Get('@me')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  async me(@Authorized('id') id: string) {
    return { id };
  }
}
