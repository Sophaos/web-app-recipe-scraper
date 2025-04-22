import { SearchBar } from "./search-bar";
import { CollectionsList } from "./collections-list";
import { useSearchHook } from "./search-hook";

export const CollectionsView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();

  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Collections</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} placeholder="Type to search your collection" />
      <CollectionsList searchTerm={searchTerm} />
    </div>
  );
};
