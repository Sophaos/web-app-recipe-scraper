import { CollectionDocument } from '../collection.schema';

export const COLLECTION_DAO_MOCK: Partial<CollectionDocument> = {
  _id: '67db5929dd4358b10d7abb41',
  name: 'Classic Pico de Gallo',
  description: 'A Description',
  recipes: [],
  __v: 0,
};

export const COLLECTION_DAO_LIST_MOCK: Partial<CollectionDocument>[] = [
  {
    _id: '67db5929dd4358b10d7abb41',
    name: 'Classic Pico de Gallo',
    description: 'A Description',
    recipes: [],
    __v: 0,
  },
  {
    _id: '67db5929dd4358b10d7abb45',
    name: 'Banana bread',
    description: 'A good bread',
    recipes: [],
    __v: 0,
  },
];

export const COLLECTION_DAO_LIST_WITHOUT_ID_MOCK: Partial<CollectionDocument>[] =
  [
    {
      name: 'Classic Pico de Gallo',
      description: 'A Description',
      recipes: [],
    },
    {
      name: 'Banana bread',
      description: 'A good bread',
      recipes: [],
    },
  ];
