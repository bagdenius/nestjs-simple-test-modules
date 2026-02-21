import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('/artists/:id')
  // async getArtist(@Param('id') id: string) {
  //   await this.appService.getArtist(id);
  // }

  // @Get('/albums/:id')
  // async getAlbum(@Param('id') id: string) {
  //   await this.appService.getAlbum(id);
  // }

  @Get(':code')
  async get(
    @Param('code') code: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const link = await this.appService.getLinkByShortCode(code);
    return response.redirect(link.originalUrl);
  }
}
