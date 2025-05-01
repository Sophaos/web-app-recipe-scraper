import { atom } from "jotai";
import { DEFAULT_COLLECTION_ID } from "../shared/collection-const";
import { Recipe } from "../models/recipe";

export const openedCollectionDrawer = atom(false);
export const selectedDrawerCollectionId = atom(DEFAULT_COLLECTION_ID);

export const selectedCollectionId = atom(DEFAULT_COLLECTION_ID);
export const selectedRecipesIds = atom<string[]>([]);
export const savedRecipes = atom<Recipe[]>([]);
