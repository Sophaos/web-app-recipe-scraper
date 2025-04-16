// utils.spec.ts
import { RECIPE_INGREDIENTS_MOCK } from 'src/recipe/mocks/recipe-ingredients.mock';
import {
  extractSchema,
  parseISO8601Duration,
  isObject,
  getString,
  getStringArray,
} from './utils';
import { ARRAY_RECIPE, RECIPE_SCHEMA_MOCK } from 'src/recipe/mocks/recipe.mock';

describe('extractSchema', () => {
  it('should return a recipe if its an array that acontains type Recipe', () => {
    expect(extractSchema(ARRAY_RECIPE, 'Recipe')).toEqual(RECIPE_SCHEMA_MOCK);
  });
  it('should return null if input is null', () => {
    expect(extractSchema(null, 'Person')).toBeNull();
  });

  it('should extract schema from array', () => {
    const jsonLd = [
      { '@type': 'Person', name: 'John' },
      { '@type': 'Event', name: 'Meeting' },
    ];
    expect(extractSchema(jsonLd, 'Person')).toEqual({
      '@type': 'Person',
      name: 'John',
    });
  });

  it('should extract schema from @graph', () => {
    const jsonLd = {
      '@graph': [
        { '@type': 'Event', name: 'Meeting' },
        { '@type': ['Person'], name: 'Jane' },
      ],
    };
    expect(extractSchema(jsonLd, 'Person')).toEqual({
      '@type': ['Person'],
      name: 'Jane',
    });
  });

  it('should return jsonLd itself if it matches type', () => {
    const jsonLd = { '@type': 'Person', name: 'Solo' };
    expect(extractSchema(jsonLd, 'Person')).toEqual(jsonLd);
  });

  it('should return null if no match', () => {
    const jsonLd = [{ '@type': 'Event' }];
    expect(extractSchema(jsonLd, 'Organization')).toBeNull();
  });
});

describe('parseISO8601Duration', () => {
  it('should return empty string for empty input', () => {
    expect(parseISO8601Duration('')).toBe('');
  });

  it('should parse hours and minutes', () => {
    expect(parseISO8601Duration('PT1H30M')).toBe('1 hour, 30 minutes');
  });

  it('should parse days', () => {
    expect(parseISO8601Duration('P2D')).toBe('2 days');
  });

  it('should parse full duration', () => {
    expect(parseISO8601Duration('P1DT2H3M4S')).toBe(
      '1 day, 2 hours, 3 minutes, 4 seconds',
    );
  });

  it('should return original string if not matching', () => {
    expect(parseISO8601Duration('INVALID')).toBe('INVALID');
  });
});

describe('isObject', () => {
  it('should return true for object', () => {
    expect(isObject({})).toBe(true);
  });

  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isObject('string')).toBe(false);
  });
});

describe('getString', () => {
  it('should return string value', () => {
    expect(getString({ a: 'test' }, 'a')).toBe('test');
  });

  it('should return undefined for non-string', () => {
    expect(getString({ a: 123 }, 'a')).toBeUndefined();
  });
});

describe('getStringArray', () => {
  it('should return string array', () => {
    expect(getStringArray({ a: ['x', 'y'] }, 'a')).toEqual(['x', 'y']);
  });

  it('should return the ingredients array', () => {
    expect(getStringArray(RECIPE_INGREDIENTS_MOCK, 'recipeIngredient')).toEqual(
      RECIPE_INGREDIENTS_MOCK.recipeIngredient,
    );
  });

  it('should return undefined for non-array', () => {
    expect(getStringArray({ a: 'not-array' }, 'a')).toBeUndefined();
  });
});
