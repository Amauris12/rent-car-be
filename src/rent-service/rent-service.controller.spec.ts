import { Test, TestingModule } from '@nestjs/testing';
import { RentServiceController } from './rent-service.controller';
import { RentServiceService } from './rent-service.service';

describe('RentServiceController', () => {
  let controller: RentServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentServiceController],
      providers: [RentServiceService],
    }).compile();

    controller = module.get<RentServiceController>(RentServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
