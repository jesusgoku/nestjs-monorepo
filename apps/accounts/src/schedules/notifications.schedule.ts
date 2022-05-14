import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { Queue } from 'bull';
import { join } from 'path';

@Injectable()
export class NotificationSchedule {
  private readonly logger = new Logger(NotificationSchedule.name);

  constructor(
    private readonly scheduleRegistry: SchedulerRegistry,
    @InjectQueue('notifications') private readonly queue: Queue,
  ) {}

  @Cron('*/4 * * * * *', { name: 'sendNotification' })
  async handleCron() {
    const job = this.scheduleRegistry.getCronJob('sendNotification');
    this.logger.log('queue sendNotification');
    await this.queue.add({
      message: job.lastDate().toISOString(),
    });
  }
}
