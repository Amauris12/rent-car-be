import { Test, TestingModule } from '@nestjs/testing';
import { ContactreviewController } from './contactreview.controller';
import { ContactreviewService } from './contactreview.service';

describe('ContactreviewController', () => {
  let controller: ContactreviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactreviewController],
      providers: [ContactreviewService],
    }).compile();

    controller = module.get<ContactreviewController>(ContactreviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
