const mockGoto = jest.fn();
const mockClose = jest.fn();
const mockNewPage = jest.fn(() => ({
  goto: mockGoto,
}));

jest.mock('@playwright/test', () => ({
  __esModule: true,
  chromium: {
    launch: jest.fn(() =>
      Promise.resolve({
        newPage: mockNewPage,
        close: mockClose,
      }),
    ),
  },
}));

jest.mock('src/scraper/scraper.helper', () => {
  const actual = jest.requireActual<
    typeof import('src/scraper/scraper.helper')
  >('src/scraper/scraper.helper');

  return {
    __esModule: true,
    ...actual,
    extractJsonLd: jest.fn(),
  };
});
import { extractJsonLd } from 'src/scraper/scraper.helper';
import { ScraperService } from './scraper.service';
import { Test } from '@nestjs/testing';
import { CreateRecipeDto } from 'src/recipe/dto/create-recipe.dto';
import { RECIPE_SCHEMA_MOCK } from 'src/recipe/mocks/recipe.mock';
import { RECIPE_INGREDIENTS_MOCK } from '../recipe/mocks/recipe-ingredients.mock';

describe('ScraperService', () => {
  let service: ScraperService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ScraperService],
    }).compile();

    service = module.get(ScraperService);
    jest.clearAllMocks();
  });

  it('should return parsed recipe details from mocked jsonLd', async () => {
    mockGoto.mockResolvedValue(undefined);

    const dto: CreateRecipeDto = { url: 'https://example.com/recipe' };
    (extractJsonLd as jest.Mock).mockResolvedValue(RECIPE_SCHEMA_MOCK);

    const result = await service.scrapeRecipe(dto);

    expect(mockGoto).toHaveBeenCalledWith(dto.url, {
      waitUntil: 'domcontentloaded',
    });
    expect(extractJsonLd).toHaveBeenCalled();
    expect(result?.name).toBe(RECIPE_SCHEMA_MOCK.name);
    expect(result?.ingredients).toEqual(
      RECIPE_INGREDIENTS_MOCK.recipeIngredient,
    );
  });
});
