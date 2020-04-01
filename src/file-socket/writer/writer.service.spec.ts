import { Test, TestingModule } from '@nestjs/testing';
import { WriterService } from './writer.service';

describe('WriterService', () => {
  let service: WriterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WriterService],
    }).compile();

    service = module.get<WriterService>(WriterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
