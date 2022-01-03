import React from 'react';
import { Grid, Typography, Slider } from '@mui/material';
import Facet from '../Facet'

export default function SearchFilters({ facets, updateFilters }) {
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
              // onChange={handleChange} 
              valueLabelDisplay="auto" 
              disableSwap marks step={0.5} min={0} max={5}
            />
          </Grid>
        </Grid>

        {facets.Category && <Facet title="Category" buckets={facets.Category}/>}
        {facets.Ingredients && <Facet title="Ingredients" buckets={facets.Ingredients}/>}

      </Grid>
    </div>
  );
}
