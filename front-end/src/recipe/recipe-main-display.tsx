import { Tag } from "antd";

type RecipeMainDisplayProps = {
  title: string;
  description: string;
  image: string;
  categories: string[];
};

export const RecipeMainDisplay = ({ title, description, image, categories }: RecipeMainDisplayProps) => {
  return (
    <div className="flex w-full h-100 bg-white rounded-lg overflow-hidden">
      <img src={image} alt={title} className="w-100 h-100 object-cover rounded-2xl" />
      <div className="flex-1 p-4 flex flex-col">
        <div className="text-3xl font-semibold">{title}</div>
        <p className="text-gray-600 mt-2">{description}</p>
        <div>
          {categories?.map((c) => (
            <Tag key={c}>{c}</Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
