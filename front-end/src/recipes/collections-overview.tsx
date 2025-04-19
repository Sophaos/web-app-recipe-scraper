import { Button } from "antd";
import { CollectionsOverviewCard } from "../shared/collection-card";
import { AddCollectionCard } from "../shared/add-collection-card";

export const CollectionsOverview = () => {
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
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
          <CollectionsOverviewCard />
        </div>
      </div>
    </div>
  );
};
