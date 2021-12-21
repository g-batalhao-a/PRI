import React, { useState } from 'react';
import { TextField, Button, Typography, Rating, Stack, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { FiltersContainer } from './style';

const defaultParams = {
  "query": "*",
  "withRating": 0,
  "minRating": 0,
  "maxRating": 5,
  "rows": 10
}

export default function SearchFilters({ sendRequest }) {
  const [queryParams, setQueryParams] = useState(defaultParams);

  const clearInput = () => {
    setQueryParams(defaultParams)
  };

  const handleFilter = (key, value) => {
    setQueryParams(previousQueryParams => { 
      previousQueryParams = {...previousQueryParams}
      previousQueryParams[key] = value
      return previousQueryParams
    });
  }

  const handleSearch = () => sendRequest(queryParams)

  return (
    <FiltersContainer>
      <Stack spacing={3}>
        <Button fullWidth variant="outlined" onClick={handleSearch} >Search</Button>
        <TextField id="outlined-search" fullWidth label="Query" type="search" onChange={(event) => handleFilter("query", event.target.value === "" ? "*" : event.target.value)} />

        <div>
          <Typography component="legend">Rating</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="With Rating" onChange={(event, newValue) => handleFilter("withRating", newValue)}/>
          </FormGroup>
          <Stack direction="row" spacing={2}>
          <div>
            <Typography component="legend">Minimum Rating</Typography>
            <Rating
              name="min-rating"
              value={queryParams.minRating}
              onChange={(event, newValue) => handleFilter("minRating", newValue)}
              precision={0.5}
            />
          </div>
          <div>
            <Typography component="legend">Maximum Rating</Typography>
            <Rating
              name="max-rating"
              value={queryParams.maxRating}
              onChange={(event, newValue) => handleFilter("maxRating", newValue)}
              precision={0.5}
            />
          </div>
        </Stack>
        </div>
        

        
      </Stack>
    </FiltersContainer>
  );
}
