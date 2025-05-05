import React from "react";
import { CollectionCard } from "../shared/collection-card";
import { useCollectionsQuery } from "../hooks/collection-query-hook";
import { AddCollectionCard } from "../shared/add-collection-card";
import { useRecipesQuery } from "../hooks/recipe-query-hook";

interface CollectionsListProps {
  searchTerm: string;
}

export const CollectionsList = ({ searchTerm }: CollectionsListProps) => {
  const { data: collections } = useCollectionsQuery(searchTerm);
  const { data: defaultCollection } = useRecipesQuery("", true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const partialDefaultCollection = defaultCollection ? (({ recipes: _, ...rest }) => rest)(defaultCollection) : undefined;
  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-1 min-w-max">
          <AddCollectionCard />
          {partialDefaultCollection && <CollectionCard collection={partialDefaultCollection} />}
          {collections?.map((c) => (
            <React.Fragment key={c.id}>
              <CollectionCard collection={c} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
