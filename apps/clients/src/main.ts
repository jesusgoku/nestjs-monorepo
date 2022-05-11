import { NestFactory } from '@nestjs/core';
import { ClientsModule } from './clients.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientsModule);

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
