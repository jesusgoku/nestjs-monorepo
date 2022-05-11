import { Test, TestingModule } from '@nestjs/testing';
import { JsonPlaceHolderService } from './json-place-holder.service';

describe('JsonPlaceHolderService', () => {
  let service: JsonPlaceHolderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonPlaceHolderService],
    }).compile();

    service = module.get<JsonPlaceHolderService>(JsonPlaceHolderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
