import { JsonPlaceHolderModule } from '@app/json-place-holder';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    JsonPlaceHolderModule.forRoot({
      baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
