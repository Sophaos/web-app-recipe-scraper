import { useSetAtom } from "jotai";
import { searchTermAtom } from "../store/search-atom";
import { useDebouncedCallback } from "use-debounce";

const DEBOUNCE_TIME = 500; //

export const useSearchHook = () => {
  const setSearchTerm = useSetAtom(searchTermAtom);
  const debouncedSetSearchTerm = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, DEBOUNCE_TIME);
  return {
    debouncedSetSearchTerm,
  };
};
