import { Test, TestingModule } from '@nestjs/testing';
import { StadiumController } from './stadium.controller';
import { StadiumService } from './stadium.service';

describe('StadiumController', () => {
  let controller: StadiumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StadiumController],
      providers: [StadiumService],
    }).compile();

    controller = module.get<StadiumController>(StadiumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
