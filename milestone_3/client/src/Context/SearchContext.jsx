import React, { createContext, useState } from "react"

export const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [facets, setFacets] = useState({});
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  return (
    <SearchContext.Provider value={{facets, setFacets, data, setData, loading, setLoading}}>
      {children}
    </SearchContext.Provider>
  );
};
