import React from "react";
import { CollectionCard } from "../shared/collection-card";
import { useCollectionsQuery } from "../hooks/collection-query-hook";
import { ALL_RECIPES_COLLECTION } from "../shared/collection-const";
import { AddCollectionCard } from "../shared/add-collection-card";

interface CollectionsListProps {
  searchTerm: string;
}

export const CollectionsList = ({ searchTerm }: CollectionsListProps) => {
  const { data: collections } = useCollectionsQuery(searchTerm);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-1 min-w-max">
          <AddCollectionCard />
          <CollectionCard collection={ALL_RECIPES_COLLECTION} />
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
