import { Controller, Get, Param } from '@nestjs/common';
import { Authorization } from '../../common/decorators';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get(':id/browsers')
  @Authorization()
  async getBrowserStats(@Param('id') id: string) {
    return await this.statisticsService.getBrowserStats(id);
  }

  @Get(':id/countries')
  @Authorization()
  async getCountryStats(@Param('id') id: string) {
    return await this.statisticsService.getCountryStats(id);
  }
}
