import { DEFAULT_COLLECTION_ID } from "./collection-const";
import { useSelectCollection } from "../hooks/select-collection-hook";
import { useSelectRecipes } from "../hooks/select-recipes-hook";
import { PictureOutlined } from "@ant-design/icons";
import { PartialCollection } from "../models/partial-collection";

interface CollectionCardProps {
  collection: PartialCollection;
}

export const CollectionCard = ({ collection }: CollectionCardProps) => {
  const { id, selectCollection } = useSelectCollection();
  const { clearIds } = useSelectRecipes();
  const isSelected = id === (collection.id ?? DEFAULT_COLLECTION_ID);

  const handleSelectCollection = () => {
    selectCollection(collection.id);
    clearIds();
  };

  return (
    <div
      data-testid="collection-card-item"
      className={`flex w-44 h-20 rounded-lg p-2 gap-2 border shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer 
    ${isSelected ? "border-blue-700 shadow-md" : "border-gray-200"}`}
      onClick={() => handleSelectCollection()}
    >
      {collection.previewImage ? (
        <img src={collection.previewImage} alt={collection.name} className="w-16 h-full object-cover rounded-md" />
      ) : (
        <div className="w-16 h-full flex items-center justify-center bg-gray-100 rounded-md">
          <PictureOutlined className="text-2xl text-gray-400" />
        </div>
      )}
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="font-semibold text-sm truncate">{collection.name}</div>
        <div className="text-xs text-gray-500">{collection.recipeCount} recipes</div>
      </div>
    </div>
  );
};
