import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSearchHook } from "./search-hook";

export const SearchBar = () => {
  const { debouncedSetSearchTerm } = useSearchHook();
  return (
    <div>
      <Input size="large" placeholder="Type to search your recipe" prefix={<SearchOutlined />} onChange={(e) => debouncedSetSearchTerm(e.target.value)} />
    </div>
  );
};
