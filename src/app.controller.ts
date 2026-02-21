import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';
import { ClientIp, UserAgent } from './common/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/artists/:id')
  async getArtist(@Param('id') id: string) {
    await this.appService.getArtist(id);
  }

  @Get('/albums/:id')
  async getAlbum(@Param('id') id: string) {
    await this.appService.getAlbum(id);
  }

  @Get(':code')
  async get(
    @Param('code') code: string,
    @Res({ passthrough: true }) response: Response,
    @ClientIp() ip: string,
    @UserAgent() userAgent: string,
  ) {
    const link = await this.appService.getLinkByShortCode(code);
    await this.appService.trackClick(link.shortCode, ip, userAgent);
    return response.redirect(link.originalUrl);
  }
}
