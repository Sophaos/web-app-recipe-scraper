import { Collection } from "../models/collection";
import { DEFAULT_COLLECTION_ID } from "./collection-const";
import { useSelectCollection } from "../hooks/select-collection-hook";
import { useSelectRecipes } from "../hooks/select-recipes-hook";

interface CollectionCardProps {
  collection: Collection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { id, selectCollection } = useSelectCollection();
  const { clearIds } = useSelectRecipes();
  const isSelected = id === (collection.id ?? DEFAULT_COLLECTION_ID);
  const { name } = collection;

  const handleSelectCollection = () => {
    selectCollection(collection.id);
    clearIds();
  };

  return (
    <div
      className={`flex w-44 h-20 rounded-lg p-2 gap-2 border shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer 
    ${isSelected ? "border-blue-700 shadow-md" : "border-gray-200"}`}
      onClick={() => handleSelectCollection()}
    >
      <img src={"https://www.thecountrycook.net/wp-content/uploads/2015/05/Slow-Cooker-Meatballs-and-Gravy.jpg"} alt={"test"} className="w-16 h-full object-cover rounded-md" />
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="font-semibold text-sm truncate">{name}</div>
        <div className="text-xs text-gray-500">3 recipes</div>
      </div>
    </div>
  );
};
