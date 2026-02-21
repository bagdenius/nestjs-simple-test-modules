import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Authorization, Authorized } from '../../common/decorators';
import { CreateLinkDto } from './dto';
import { LinkService } from './link.service';

@Controller('links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  @Authorization()
  async create(@Body() dto: CreateLinkDto, @Authorized('id') id: string) {
    return await this.linkService.create(dto, id);
  }

  @Delete(':id')
  @Authorization()
  async delete(@Param('id') id: string) {
    await this.linkService.delete(id);
  }
}
