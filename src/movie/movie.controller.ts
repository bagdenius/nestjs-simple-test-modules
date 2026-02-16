import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { MovieService } from './movie.service';

@Controller({ path: 'movies' })
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  getAll(@Query() query: any) {
    return `Movies by parameters: ${JSON.stringify(query)}`;
  }

  @Post()
  create(@Body() body: { title: string; genre: string }) {
    return body;
  }

  @Get('headers')
  getHeaders(@Headers() headers: any) {
    return headers;
  }

  @Get('user-agent')
  getUserAgent(@Headers('user-agent') header: any) {
    return { header };
  }

  @Get('request')
  getRequestDetails(@Req() request: Request) {
    return request.method;
  }

  @Get('response')
  getRsponseDetails(@Res() response: Response) {
    return response.status(200).json({ message: 'Response' });
  }

  @Get(':id')
  getParams(@Param('id') id: string) {
    return { id };
  }
}
