import { CollectionModal } from "../modals/collection-modal";
import { AddRecipeModal } from "../modals/add-recipe-modal";
import { CollectionsView } from "../recipes/collections-view";
import { RecipesHeader } from "../recipes/recipes-header";
import { RecipesLayout } from "../recipes/recipes-layout";
import { RecipesView } from "../recipes/recipes-view";

export const RecipesPage = () => {
  return (
    <RecipesLayout>
      <RecipesHeader />
      <CollectionsView />
      <RecipesView />
      <AddRecipeModal />
      <CollectionModal />
    </RecipesLayout>
  );
};
