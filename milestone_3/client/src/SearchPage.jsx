import React, { useState } from 'react';
import SearchFilters from "./Components/SearchFilters";
import SearchResults from "./Components/SearchResults";
import { Grid } from '@mui/material';
import axios from 'axios'

const api = axios.create({
    baseURL: `http://localhost:3001/`
})

export default function SearchPage() {
  const [filteredData, setFilteredData] = useState([]);

  const sendRequest = async (params) => {
    let response = await api.get('search', { params: params }).then(({ data }) => data)
    console.log(response)
    setFilteredData(response)
  }

  return (
    <Grid container>
      <Grid item xs={3}>
          <SearchFilters sendRequest={sendRequest} />
      </Grid>
      <Grid item xs={9}>
          <SearchResults data={filteredData} sendRequest={sendRequest} />
      </Grid>
    </Grid>
  );
}
