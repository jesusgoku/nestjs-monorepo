import {
  CacheInterceptor,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  private readonly logger = new Logger(HttpCacheInterceptor.name);

  protected trackBy(context: ExecutionContext): string {
    const key = super.trackBy(context);

    this.logger.log(`key: "${key}"`);

    return key;
  }
}
