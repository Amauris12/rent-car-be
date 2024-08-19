import { Test, TestingModule } from '@nestjs/testing';
import { RentServiceService } from './rent-service.service';

describe('RentServiceService', () => {
  let service: RentServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RentServiceService],
    }).compile();

    service = module.get<RentServiceService>(RentServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
