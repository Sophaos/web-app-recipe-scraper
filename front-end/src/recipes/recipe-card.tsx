export const RecipeCard = () => {
  return (
    <div className="flex flex-col w-55">
      <div className="image">
        <div>like ration</div>
        <div>image</div>
        <div>site name</div>
      </div>
      <div className="font-semibold">title</div>
      <div className="flex flex-row justify-between">
        <div># ingredients</div>
        <div>duration</div>
      </div>
    </div>
  );
};
