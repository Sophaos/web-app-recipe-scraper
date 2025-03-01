import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input } from "antd";

export const SearchBar = () => {
  return (
    <div>
      <Input size="large" placeholder="Search recipe" prefix={<SearchOutlined />} />
      <Divider />
    </div>
  );
};
