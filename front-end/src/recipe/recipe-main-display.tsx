type RecipeMainDisplayProps = {
  title: string;
  description: string;
  image: string;
};

export const RecipeMainDisplay = ({ title, description, image }: RecipeMainDisplayProps) => {
  return (
    <div className="flex w-full h-100 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Image Section */}
      <img src={image} alt={title} className="w-100 h-100  object-cover" />

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};
