import { Test, TestingModule } from '@nestjs/testing';
import { StadiumService } from './stadium.service';

describe('StadiumService', () => {
  let service: StadiumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StadiumService],
    }).compile();

    service = module.get<StadiumService>(StadiumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
