import { useAtom } from "jotai";
import { savedRecipes, selectedRecipesIds } from "../store/selected-atom";
import { Recipe } from "../models/recipe";

export const useSelectRecipes = () => {
  const [ids, setIds] = useAtom(selectedRecipesIds);
  const [recipes, setRecipes] = useAtom(savedRecipes);
  const length = ids.length;
  const hasAnyIds = length > 0;

  const toggleSelect = (recipeId: string) => {
    setIds((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]));
  };

  const clearIds = () => {
    setIds([]);
  };

  const selectAll = (items?: Recipe[]) => {
    setIds(items?.map((i) => i.id) ?? []);
  };

  const addToSavedRecipes = (items?: Recipe[]) => {
    if (items === undefined) return;
    setRecipes((prev) => {
      const existingIds = new Set(prev.map((r) => r.id));
      const newItems = items.filter((item) => !existingIds.has(item.id));
      return [...prev, ...newItems];
    });
    clearIds();
  };

  return {
    ids,
    length,
    hasAnyIds,
    recipes,
    addToSavedRecipes,
    clearIds,
    toggleSelect,
    selectAll,
  };
};
