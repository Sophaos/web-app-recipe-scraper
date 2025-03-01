import { RecipesHeader } from "../recipes/recipes-header";
import { RecipesLayout } from "../recipes/recipes-layout";
import { RecipesList } from "../recipes/recipes-list";
import { SearchBar } from "../recipes/search-bar";

export const RecipesPage = () => {
  return (
    <RecipesLayout>
      <RecipesHeader />
      <SearchBar />
      <RecipesList />
    </RecipesLayout>
  );
};
