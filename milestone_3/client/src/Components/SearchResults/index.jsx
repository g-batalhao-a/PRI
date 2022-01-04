import React, { useContext, useMemo } from 'react';
import { Grid, LinearProgress, Pagination, Typography } from '@mui/material';
import Recipe from '../Recipe'
import { SearchContext } from '../../Context/SearchContext';

export default function SearchResults({ sendRequest }) {
  const {loading, data} = useContext(SearchContext)

  const handlePagination = (page) => {
    sendRequest({ ...data.queryParams, page })
  }

  const renderResults = () => {
    let page = data.queryParams.page ? parseInt(data.queryParams.page) : 1

    return (
      <div style={{padding: "0 1em"}}>
        <Typography textAlign="end">
          Showing {(page - 1) * 10 + 1}-{(page - 1) * 10 + data.recipes.length} of {data.total} results
        </Typography>
        <div>
          { data.recipes.map(entry => <Recipe key={entry.RecipeId} data={entry} />) }
        </div>
        <Pagination 
          shape="rounded" color="secondary" size="large"
          count={data.pages} 
          sx={{ ul: { justifyContent: 'flex-end' }}}
          page={page} 
          onChange={(event, value) => handlePagination(value)} 
          onClick={window.scroll({top:0,behavior:'smooth'})} 
        />      
      </div>
    );
  }

  return useMemo(() => {
    return (
      loading?
        <LinearProgress/> :
      <div>
          { !data.recipes || data.recipes.length === 0 ? "No Results!" : renderResults() } 
      </div>
    )
  }, [data, loading])
}
