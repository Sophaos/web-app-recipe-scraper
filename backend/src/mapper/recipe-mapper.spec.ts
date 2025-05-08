import { RECIPE_DOCUMENT_DAO_MOCK } from 'src/recipe/mocks/recipe-document.mock';
import { RecipeDocument } from 'src/recipe/recipe.schema';
import { RECIPE_DTO_MOCK } from 'src/recipe/mocks/recipe.mock';
import { toRecipeDTO } from './recipe-mapper';

describe('toRecipeDTO', () => {
  it('should properly convert a recipe document to a DTO', () => {
    const result = toRecipeDTO(RECIPE_DOCUMENT_DAO_MOCK as RecipeDocument);
    expect(result).toEqual(RECIPE_DTO_MOCK);
  });
});
