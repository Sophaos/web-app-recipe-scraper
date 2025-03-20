import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export const SearchBar = () => {
  return (
    <div>
      <Input size="large" placeholder="Search recipe" prefix={<SearchOutlined />} />
    </div>
  );
};
