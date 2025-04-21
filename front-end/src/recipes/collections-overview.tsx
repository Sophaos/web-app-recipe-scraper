import { Button } from "antd";
import { CollectionsOverviewCard } from "../shared/collection-card";
import { AddCollectionCard } from "../shared/add-collection-card";
import { useCollectionsQuery } from "../hooks/collection-query-hook";
import React from "react";

export const CollectionsOverview = () => {
  const { data: collections } = useCollectionsQuery();
  return (
    <div>
      <div className="flex flex-row justify-between pb-1">
        <div className="text-2xl font-semibold">Collections</div>
        <Button color="default" variant="outlined">
          See all
        </Button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex flex-row gap-1 min-w-max">
          <AddCollectionCard />
          {collections?.map((c) => (
            <React.Fragment key={c.id}>
              <CollectionsOverviewCard />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
