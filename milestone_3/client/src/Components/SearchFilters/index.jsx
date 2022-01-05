import React, { useContext, useMemo } from 'react';
import { Grid, Typography, Slider } from '@mui/material';
import Facet from '../Facet'
import { SearchContext } from '../../Context/SearchContext';

export default function SearchFilters({ sendRequest }) {
  const { data } = useContext(SearchContext)

  const handleFilters = (filter, value) => {
    let newParams = { ...data.queryParams, filter, page: 1 }
    newParams[filter] = value
    sendRequest(newParams)
  }

  return useMemo(() => {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="secondary">Filters</Typography>
          </Grid>

          <Grid container item xs={12} spacing={1} alignItems="center">
            <Grid item xs={12} md={5}>
              <Typography variant="button" color="secondary">Rating</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slider defaultValue={[0, 5]}
                onChangeCommitted={(e, val) => handleFilters("rating", val)} 
                valueLabelDisplay="auto" 
                disableSwap marks step={0.5} min={0} max={5}
              />
            </Grid>
          </Grid>

          {data.facets && data.facets.Category && <Facet title="category" handleFilters={handleFilters} buckets={data.facets.Category}/>}
          {data.facets && data.facets.Ingredients && <Facet title="ingredients"  handleFilters={handleFilters} buckets={data.facets.Ingredients}/>}

        </Grid>
      </div>
    )
  }, [data]);
}
