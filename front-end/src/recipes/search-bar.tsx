import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { DebouncedState } from "use-debounce";

interface SearchBarProps {
  setSearchTerm: DebouncedState<(value: string) => void>;
}
export const SearchBar = ({ setSearchTerm }: SearchBarProps) => {
  return (
    <>
      <Input size="large" placeholder="Type to search your recipe" prefix={<SearchOutlined />} onChange={(e) => setSearchTerm(e.target.value)} />
    </>
  );
};
