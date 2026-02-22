import { Injectable } from '@nestjs/common';
import { lookup } from 'geoip-country';
import { UAParser } from 'ua-parser-js';
import { PrismaService } from '../../infra/prisma';
import { formatName } from '../../common/utils';

@Injectable()
export class StatisticsService {
  private readonly parser: UAParser;

  constructor(private readonly prisma: PrismaService) {
    this.parser = new UAParser();
  }

  private async getClicks(linkId: string) {
    const clicks = await this.prisma.click.findMany({ where: { linkId } });
    return clicks;
  }

  private getBrowserByUserAgent(userAgent: string) {
    this.parser.setUA(userAgent);
    const result = this.parser.getResult();
    return {
      browser: formatName(result.browser.name ?? 'Unknown'),
    };
  }

  private getCountryByIp(ip: string) {
    const geo = lookup(ip);
    return { country: geo?.name ?? 'Unknown' };
  }

  async getBrowserStats(id: string) {
    const clicks = await this.getClicks(id);
    const stats = clicks.reduce((acc, click) => {
      const { browser } = this.getBrowserByUserAgent(click.userAgent);
      if (acc[browser]) acc[browser]++;
      else acc[browser] = 1;
      return acc;
    }, {});
    return stats;
  }

  async getCountryStats(id: string) {
    const clicks = await this.getClicks(id);
    const stats = clicks.reduce((acc, click) => {
      const { country } = this.getCountryByIp(click.ipAddress);
      if (acc[country]) acc[country]++;
      else acc[country] = 1;
      return acc;
    }, {});
    return stats;
  }
}
