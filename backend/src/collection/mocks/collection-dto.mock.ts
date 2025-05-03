import { CollectionDTO } from '../dto/collection.dto';
import { CreateCollectionDto } from '../dto/create-collection.dto';

export const COLLECTION_DTO_MOCK: CollectionDTO = {
  id: '67db5929dd4358b10d7abb41',
  name: 'Classic Pico de Gallo',
  description: 'A Description',
  recipes: [],
};

export const CREATE_COLLECTION_DTO_MOCK: CreateCollectionDto = {
  name: 'Classic Pico de Gallo',
  description: 'A Description',
  recipeIds: [],
};
