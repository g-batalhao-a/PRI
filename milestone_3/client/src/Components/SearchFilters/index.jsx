import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

const defaultParams = {
  "query": "*",
  "rows": 10
}

export default function SearchFilters({ sendRequest }) {
  const [queryParams, setQueryParams] = useState(defaultParams);

  const clearInput = () => {
    setQueryParams(defaultParams)
  };

  const handleQuery = (event) => {
    const searchQuery = event.target.value;
    setQueryParams(previousQueryParams => { 
      return {...previousQueryParams, query: searchQuery}
    });
  };

  const handleSearch = () => sendRequest(queryParams)

  return (
    <div className="searchFilters">
      <input type="text" onChange={handleQuery} />
      <div className="searchIcon">
        <SearchIcon id="clearBtn" onClick={handleSearch} />
        <CloseIcon id="clearBtn" onClick={clearInput} />
      </div>
    </div>
  );
}
