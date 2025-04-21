import React from "react";
import { AddCollectionCard } from "../shared/add-collection-card";
import { CollectionCard } from "../shared/collection-card";
import { useCollectionsQuery } from "../hooks/collection-query-hook";

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
          {collections?.map((c) => (
            <React.Fragment key={c.id}>
              <CollectionCard />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};
