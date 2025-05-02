import { AddRecipeModal } from "../modals/add-recipe-modal";
import { CollectionsView } from "../recipes/collections-view";
import { RecipesHeader } from "../recipes/recipes-header";
import { RecipesLayout } from "../recipes/recipes-layout";
import { RecipesView } from "../recipes/recipes-view";
import { CollectionDrawer } from "../collection/collection-drawer";

export const RecipesPage = () => {
  return (
    <>
      <RecipesLayout>
        <RecipesHeader />
        <CollectionsView />
        <RecipesView />
        <AddRecipeModal />
      </RecipesLayout>
      <CollectionDrawer />
    </>
  );
};
