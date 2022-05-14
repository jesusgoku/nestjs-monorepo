import { JsonPlaceHolderModule } from '@app/json-place-holder';
import {
  CacheModule,
  CACHE_MANAGER,
  Inject,
  Logger,
  Module,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsListener } from './listeners/posts.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CacheModule.register({
      store: redisStore,
    }),
    JsonPlaceHolderModule.forRoot({
      baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PostsListener],
})
export class AppModule {
  private readonly logger: Logger = new Logger(AppModule.name);

  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager) {
    const client = cacheManager.store.getClient();

    // Prevent app crash when redis server is unavailable
    client.on('error', (err) => {
      this.logger.error(err);
    });
  }
}
