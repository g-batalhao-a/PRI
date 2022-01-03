import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import FacetItem from '../FacetItem'

export default function Facet({ title, buckets }) {
  // const [selected, setSelected] = useState([])

  // const handleChange = (event) => {
  //   setSelected(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
  // };

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <Typography variant="button" id={title} color="secondary">{title}</Typography>
      </Grid>
      
      <Grid container item xs={12} sx={{ overflowY: 'scroll', overflowX: 'hidden', maxHeight: '10em'}}>
        {buckets.map((value) => (
        <Grid key={value.val} item xl={6} xs={12} >
          <FacetItem value={value.val} count={value.count}/>
        </Grid>
        ))}
      </Grid>
      
    </Grid>
  );
}