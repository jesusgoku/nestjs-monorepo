import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';

@Injectable()
export class RefreshCacheSchedule {
  private readonly logger: Logger = new Logger(RefreshCacheSchedule.name);

  constructor(private readonly scheduleRegistry: SchedulerRegistry) {}

  @Cron('45 * * * * *', { name: 'refresh-cache-schedule-cron' })
  handleCron() {
    this.logger.log('Called when the current second is 45');

    const job = this.scheduleRegistry.getCronJob('refresh-cache-schedule-cron');

    job.stop();

    this.logger.log(job.lastDate());
  }

  @Interval('refresh-cache-schedule-interval', 10000)
  handleInterval() {
    this.logger.log('Called every 10 seconds');

    const interval = this.scheduleRegistry.getInterval(
      'refresh-cache-schedule-interval',
    );

    clearInterval(interval);
  }

  @Timeout('refresh-cache-schedule-timeout', 5000)
  handleTimeout() {
    this.logger.log('Called once after 5 seconds');
  }
}
