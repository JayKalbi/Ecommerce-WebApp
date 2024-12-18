import { useState, useContext, createContext } from "react";

// Create a context for the search
const SearchContext = createContext();

// Create a provider component
const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[values, setValues]}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use the search context
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
