import { Test, TestingModule } from '@nestjs/testing';
import { ContactreviewService } from './contactreview.service';

describe('ContactreviewService', () => {
  let service: ContactreviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactreviewService],
    }).compile();

    service = module.get<ContactreviewService>(ContactreviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
