import {
  RECIPE_INSTRUCTIONS_MOCK,
  RECIPE_INSTRUCTIONS_RES_MOCK,
} from 'src/mocks/recipe-instructions-mock';
import {
  extractImageUrls,
  extractInstructions,
  extractRecipeDetails,
} from './scraper.helper';
import {
  RECIPE_DOCUMENT_MOCK,
  RECIPE_SCHEMA_MOCK,
  RECIPE_URL,
} from 'src/mocks/recipe-mock';

describe('extractInstructions', () => {
  it('should return [] if recipeInstructions is missing', () => {
    expect(extractInstructions({})).toEqual([]);
  });

  it('should return strings when recipeInstructions is an array of strings', () => {
    const schema = {
      recipeInstructions: ['Step 1', 'Step 2'],
    };
    expect(extractInstructions(schema)).toEqual(['Step 1', 'Step 2']);
  });

  it('should return step texts from HowToStep objects', () => {
    const schema = {
      recipeInstructions: [
        { '@type': 'HowToStep', text: 'Step A' },
        { '@type': 'HowToStep', text: 'Step B' },
      ],
    };
    expect(extractInstructions(schema)).toEqual(['Step A', 'Step B']);
  });

  it('should extract steps from HowToSection', () => {
    const schema = {
      recipeInstructions: [
        {
          '@type': 'HowToSection',
          itemListElement: [
            { '@type': 'HowToStep', text: 'Step X' },
            { '@type': 'HowToStep', text: 'Step Y' },
          ],
        },
      ],
    };
    expect(extractInstructions(schema)).toEqual(['Step X', 'Step Y']);
  });

  it('should extract steps from a recipe', () => {
    expect(extractInstructions(RECIPE_INSTRUCTIONS_MOCK)).toEqual(
      RECIPE_INSTRUCTIONS_RES_MOCK,
    );
  });

  it('should ignore invalid steps', () => {
    const schema = {
      recipeInstructions: [
        { '@type': 'HowToStep' },
        { '@type': 'HowToSection', itemListElement: [{}] },
      ],
    };
    expect(extractInstructions(schema)).toEqual([]);
  });
});

describe('extractImageUrls', () => {
  it('should return [] if image is missing', () => {
    expect(extractImageUrls({})).toEqual([]);
  });

  it('should return image string if image is a string', () => {
    expect(extractImageUrls({ image: 'http://img.com/1.jpg' })).toEqual([
      'http://img.com/1.jpg',
    ]);
  });

  it('should return image urls from an array of strings', () => {
    expect(
      extractImageUrls({
        image: ['http://img.com/1.jpg', 'http://img.com/2.jpg'],
      }),
    ).toEqual(['http://img.com/1.jpg', 'http://img.com/2.jpg']);
  });

  it('should extract urls from objects with url', () => {
    const schema = {
      image: [{ url: 'http://img.com/a.jpg' }, { url: 'http://img.com/b.jpg' }],
    };
    expect(extractImageUrls(schema)).toEqual([
      'http://img.com/a.jpg',
      'http://img.com/b.jpg',
    ]);
  });

  it('should handle single object with url', () => {
    const schema = {
      image: { url: 'http://img.com/only.jpg' },
    };
    expect(extractImageUrls(schema)).toEqual(['http://img.com/only.jpg']);
  });

  it('should skip invalid image entries', () => {
    const schema = {
      image: [null, {}, { url: 123 }, 'http://valid.com/image.jpg'],
    };
    expect(extractImageUrls(schema)).toEqual(['http://valid.com/image.jpg']);
  });
});

describe('extractRecipeDetails', () => {
  it('should extract the recipe details', () => {
    const recipeDocument = extractRecipeDetails(RECIPE_SCHEMA_MOCK, RECIPE_URL);
    expect(recipeDocument).toEqual(RECIPE_DOCUMENT_MOCK);
  });
});
