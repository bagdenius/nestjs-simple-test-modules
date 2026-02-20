import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('CRON task executes every 10 seconds');
  }

  @Interval(1000)
  handleInterval() {
    console.log('Interval task executes every second');
  }

  @Timeout(5000)
  handleTimeout() {
    console.log('Timeout task after 5 seconds after start');
  }
}
