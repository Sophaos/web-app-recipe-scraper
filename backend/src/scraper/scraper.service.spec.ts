import { Test, TestingModule } from '@nestjs/testing';
import { ScraperServiceService } from './scraper.service';

describe('ScraperServiceService', () => {
  let service: ScraperServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScraperServiceService],
    }).compile();

    service = module.get<ScraperServiceService>(ScraperServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
