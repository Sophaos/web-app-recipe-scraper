import { atom } from "jotai";
import { DEFAULT_COLLECTION_ID } from "../shared/collection-const";

export const selectedCollectionId = atom(DEFAULT_COLLECTION_ID);
