import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider value={{data, setData, loading, setLoading, query, setQuery}}>
      {children}
    </SearchContext.Provider>
  );
};
