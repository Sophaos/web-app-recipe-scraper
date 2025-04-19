import { CollectionModal } from "../modals/collection-modal";
import { AddRecipeModal } from "../modals/add-recipe-modal";
import { CollectionsOverview } from "../recipes/collections-overview";
import { RecipesHeader } from "../recipes/recipes-header";
import { RecipesLayout } from "../recipes/recipes-layout";
import { RecipesList } from "../recipes/recipes-list";

export const RecipesPage = () => {
  return (
    <RecipesLayout>
      <RecipesHeader />
      <CollectionsOverview />
      <RecipesList />
      <AddRecipeModal />
      <CollectionModal />
    </RecipesLayout>
  );
};
