import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserAgent } from './common/decorators/user-agent.decorator';
import { AuthGuard } from './common/guards/auth.guard';
import { LowercasePipe } from './common/pipes/lowercase.pipe';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @UsePipes(LowercasePipe)
  create(@Body('title') title: String) {
    return `Movie ${title}`;
  }

  @Get('@me')
  @UseGuards(AuthGuard)
  GetProfile(@UserAgent() userAgent: string) {
    return {
      id: 1,
      username: 'bagdenius',
      email: 'bagdenius@gmail.com',
      userAgent,
    };
  }
}
