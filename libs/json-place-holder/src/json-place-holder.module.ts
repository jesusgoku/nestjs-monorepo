import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { JSON_PLACE_HOLDER_SERVICE_OPTIONS } from './constants';
import { JsonPlaceHolderModuleOptions } from './interfaces';
import { JsonPlaceHolderService } from './json-place-holder.service';

@Global()
@Module({
  providers: [JsonPlaceHolderService],
  exports: [JsonPlaceHolderService],
})
export class JsonPlaceHolderModule {
  static forRoot(options: JsonPlaceHolderModuleOptions): DynamicModule {
    return {
      module: JsonPlaceHolderModule,
      providers: [
        JsonPlaceHolderService,
        this.getJsonPlaceHolderServiceOptionsProvider(options),
      ],
      exports: [JsonPlaceHolderService],
    };
  }

  private static getJsonPlaceHolderServiceOptionsProvider(
    options: JsonPlaceHolderModuleOptions,
  ): Provider {
    return {
      provide: JSON_PLACE_HOLDER_SERVICE_OPTIONS,
      useValue: options,
    };
  }
}
