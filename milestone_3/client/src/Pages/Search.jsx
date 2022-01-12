import React, { useContext } from 'react';
import SearchFilters from "../Components/SearchFilters";
import SearchResults from "../Components/SearchResults";
import SearchBar from "../Components/SearchBar"
import { Grid } from '@mui/material';
import axios from 'axios'
import { SearchContext } from '../Context/SearchContext';
import Sort from '../Components/Sort';

const api = axios.create({
    baseURL: `http://localhost:3001/`
})

export default function Search() {
  const { setData, setLoading, setQuery } = useContext(SearchContext)

  const sendRequest = async (params) => {
    setLoading(true)
    let response = await api.get('search', { params: params }).then(({ data }) => data)
    console.log(response)
    setData(response)
    setLoading(false)
  }

  React.useEffect(() => {
    handleSearch()
  }, [])

  const handleSearch = (searchQuery) => {
    sendRequest({ query: searchQuery ? searchQuery : "*" })
    setQuery(searchQuery ? searchQuery : "*")
  }

  return (
    <Grid container spacing={4} justifyContent='center' sx={{ padding: '1.5em' }}>
      <Grid item xs={12} md={8}>
        <SearchBar handleSearch={handleSearch}/>
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <Sort sendRequest={sendRequest}/>
      </Grid>
      <Grid item xs={6} md={3} lg={2}>
        <SearchFilters sendRequest={sendRequest} />
      </Grid>
      <Grid item xs={12} md={9}>
        <SearchResults sendRequest={sendRequest} />
      </Grid>
    </Grid>
  );
}
