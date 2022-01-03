import React, { useState } from 'react';
import SearchFilters from "../Components/SearchFilters";
import SearchResults from "../Components/SearchResults";
import SearchBar from "../Components/SearchBar"
import { Grid } from '@mui/material';
import axios from 'axios'
import Sort from '../Components/Sort';

const api = axios.create({
    baseURL: `http://localhost:3001/`
})

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const sendRequest = async (params) => {
    setLoading(true)
    let response = await api.get('search', { params: params }).then(({ data }) => data)
    console.log(response)
    setData(response)
    setLoading(false)
  }

  React.useEffect(() => {
    sendRequest({ query: "*" })
  }, [])

  const handleSearch = (searchQuery) => {
    sendRequest({ query: searchQuery ? searchQuery : "*" })
  }

  const handleSort = (sort) => {
    sendRequest({ ...data.queryParams, sort })
  }

  const handleFilters = (filter, value) => {
    console.log("Filter " + filter + " changed to: " + value)
  }

  const handlePagination = (page) => {
    sendRequest({ ...data.queryParams, page })
  }

  return (
    <Grid container spacing={4} justifyContent='center' sx={{ padding: '1.5em' }}>
      <Grid item xs={12} md={8}>
        <SearchBar handleSearch={handleSearch}/>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Sort handleSort={handleSort}/>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <SearchFilters facets={data.facets ? data.facets : {}} handleFilters={handleFilters} />
      </Grid>
      <Grid item xs={12} md={9}>
        {
          loading
            ? "Loading..."
            : <SearchResults data={data} handlePagination={handlePagination} />
        }
      </Grid>
    </Grid>
  );
}
