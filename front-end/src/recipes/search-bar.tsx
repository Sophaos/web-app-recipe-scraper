import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useSetAtom } from "jotai";
import { searchTermAtom } from "../store/search-atom";

export const SearchBar = () => {
  const setSearchTerm = useSetAtom(searchTermAtom);
  return (
    <div>
      <Input size="large" placeholder="Search recipe" prefix={<SearchOutlined />} onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};
