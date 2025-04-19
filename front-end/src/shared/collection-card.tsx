interface CollectionsOverviewCardProps {
  title: string;
  recipeCount: number;
  imageUrl: string;
  //   onClick?: () => void;
}

export const CollectionsOverviewCard = () => {
  return (
    <div className="flex w-44 h-20 rounded-lg p-2 gap-2 border shadow-sm bg-white hover:shadow-md transition-shadow cursor-pointer">
      <img src={"https://www.thecountrycook.net/wp-content/uploads/2015/05/Slow-Cooker-Meatballs-and-Gravy.jpg"} alt={"test"} className="w-16 h-full object-cover rounded-md" />
      <div className="flex flex-col justify-center overflow-hidden">
        <div className="font-semibold text-sm truncate">test</div>
        <div className="text-xs text-gray-500">3 recipes</div>
      </div>
    </div>
  );
};
