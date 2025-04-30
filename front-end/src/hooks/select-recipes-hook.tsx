import { useAtom } from "jotai";
import { selectedRecipesIds } from "../store/selected-atom";

export const useSelectRecipes = () => {
  const [ids, setIds] = useAtom(selectedRecipesIds);
  const length = ids.length;
  const hasAnyIds = ids.length > 0;

  const toggleSelect = (recipeId: string) => {
    setIds((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]));
  };

  const clearIds = () => {
    setIds([]);
  };
  return {
    ids,
    length,
    clearIds,
    toggleSelect,
    hasAnyIds,
  };
};
