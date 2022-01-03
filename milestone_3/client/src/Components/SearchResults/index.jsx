import React from 'react';
import { Pagination } from '@mui/material';
import Recipe from '../Recipe'

export default function SearchResults({ data, handlePagination }) {
  const renderResults = () => {
    return (
      <>
        <Pagination 
          shape="rounded" color="secondary"
          count={data.pages} 
          sx={{ ul: { justifyContent: 'flex-end' }}}
          page={data.queryParams.page ? parseInt(data.queryParams.page) : 1} 
          onChange={(event, value) => handlePagination(value)} 
          onClick={window.scroll({top:0,behavior:'smooth'})} 
        />
        <div>
          { data.recipes.map(entry => <Recipe key={entry.RecipeId} data={entry} />) }
        </div>
        <Pagination 
          shape="rounded" color="secondary"
          count={data.pages} 
          sx={{ ul: { justifyContent: 'flex-end' }}}
          page={data.queryParams.page ? parseInt(data.queryParams.page) : 1} 
          onChange={(event, value) => handlePagination(value)} 
          onClick={window.scroll({top:0,behavior:'smooth'})} 
        />      
      </>
    );
  }

  return (
    <div>
        { !data.recipes || data.recipes.length === 0 ? "No Results!" : renderResults() } 
    </div>
    
  );
}
