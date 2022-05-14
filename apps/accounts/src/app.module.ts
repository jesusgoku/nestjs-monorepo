import { JsonPlaceHolderModule } from '@app/json-place-holder';
import { CacheModule, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsListener } from './listeners/posts.listener';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    CacheModule.register(),
    JsonPlaceHolderModule.forRoot({
      baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PostsListener],
})
export class AppModule {}
