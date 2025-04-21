import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";

const DEBOUNCE_TIME = 500; //

export const useSearchHook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSetSearchTerm = useDebouncedCallback((value: string) => {
    setSearchTerm(value);
  }, DEBOUNCE_TIME);
  return {
    debouncedSetSearchTerm,
    searchTerm,
  };
};
