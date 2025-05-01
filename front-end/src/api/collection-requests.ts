export interface CreateCollectionRequest {
  name: string;
  description?: string;
  recipeIds?: string[];
}

export type UpdateCollectionRequest = CreateCollectionRequest & { id: string };

export interface AddToCollectionRequest {
  id: string;
  recipeId: string;
}

export interface DeleteCollectionRequest {
  id: string;
}

export interface GetCollectionRequest {
  id: string;
}
