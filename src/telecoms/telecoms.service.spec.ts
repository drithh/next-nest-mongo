import { Test, TestingModule } from '@nestjs/testing';
import { TelecomsService } from './telecoms.service';

describe('TelecomsService', () => {
  let service: TelecomsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelecomsService],
    }).compile();

    service = module.get<TelecomsService>(TelecomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
