import { JsonPlaceHolderModule } from '@app/json-place-holder';
import { BullModule } from '@nestjs/bull';
import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  Logger,
  Module,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-ioredis';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsListener } from './listeners/posts.listener';
import { NotificationsProcessor } from './processors/notifications.processor';
import { NotificationSchedule } from './schedules/notifications.schedule';
import { RefreshCacheSchedule } from './schedules/refresh-cache.schedule';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      enableOfflineQueue: false,
    }),
    ScheduleModule.forRoot(),
    BullModule.forRoot({}),
    BullModule.registerQueue({
      name: 'notifications',
      // Require build with tsc
      // processors: [join(__dirname, './processor.js')],
    }),
    JsonPlaceHolderModule.forRoot({
      baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PostsListener,
    RefreshCacheSchedule,
    NotificationSchedule,
    NotificationsProcessor,
  ],
})
export class AppModule {
  private readonly logger: Logger = new Logger(AppModule.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager) {
    const client = cacheManager.store?.getClient?.();

    // Prevent app crash when redis server is unavailable
    if (client) {
      client.on('error', (err) => {
        this.logger.error(err);
      });
    }
  }
}
