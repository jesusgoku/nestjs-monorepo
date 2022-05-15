import { LogLevel } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // -- Determine logger level
  const defaultLoggerLevel: LogLevel = 'log';
  const loggerLevels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
  const isLoggerEnabled = process.env.LOG_DISABLE === undefined;
  const rawLoggerLevel = (
    process.env.LOG_LEVEL ?? ''
  ).toLowerCase() as LogLevel;
  const loggerLevel = loggerLevels.includes(rawLoggerLevel)
    ? rawLoggerLevel
    : defaultLoggerLevel;
  const logger =
    isLoggerEnabled &&
    loggerLevels.slice(0, loggerLevels.indexOf(loggerLevel) + 1);

  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
