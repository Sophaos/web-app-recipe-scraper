import { RECIPE_DOCUMENT_DAO_MOCK } from 'src/mocks/recipe-document.mock';
import { toRecipeDTO } from './recipe.helper';
import { RecipeDocument } from 'src/schemas/recipe.schema';
import { RECIPE_DTO_MOCK } from 'src/mocks/recipe-mock';

describe('toRecipeDTO', () => {
  it('should properly convert a recipe document to a DTO', () => {
    const result = toRecipeDTO(RECIPE_DOCUMENT_DAO_MOCK as RecipeDocument);
    expect(result).toEqual(RECIPE_DTO_MOCK);
  });
});
