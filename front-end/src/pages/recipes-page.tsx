import { Button, Input } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

export const RecipesPage = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-row justify-between">
        <div>Saved Recipes</div>
        <Button type="primary" icon={<PlusOutlined />}>
          Save
        </Button>
      </div>
      <div>
        <Input size="large" placeholder="large size" prefix={<SearchOutlined />} />
      </div>
      <div>
        <div>Recipes</div>
        <div className="inline-grid grid-cols-3 gap-4">
          <div>01</div>
          <div>02</div>
          <div>03</div>
          <div>04</div>
          <div>05</div>
          <div>06</div>
        </div>
      </div>
    </div>
  );
};
