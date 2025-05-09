import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { DebouncedState } from "use-debounce";

interface SearchBarProps {
  setSearchTerm: DebouncedState<(value: string) => void>;
  placeholder: string;
}
export const SearchBar = ({ setSearchTerm, placeholder }: SearchBarProps) => {
  return (
    <>
      <Input data-testid="search-bar-input" size="large" placeholder={placeholder} prefix={<SearchOutlined />} onChange={(e) => setSearchTerm(e.target.value)} />
    </>
  );
};
