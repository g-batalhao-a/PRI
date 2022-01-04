import React, { useContext, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import InputContainer from '../InputContainer'
import InputIconWrapper from '../InputIconWrapper'
import { SearchContext } from '../../Context/SearchContext';

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export default function Sort({ sendRequest }) {
  const [sort, setSort] = useState("Relevance")

  const {data} = useContext(SearchContext)

  const handleSort = (sort) => {
    setSort(sort)
    sendRequest({ ...data.queryParams, sort, page:1 })
  }


  return useMemo(() => {
    return (
      <InputContainer>
        <InputIconWrapper>
          <SortIcon/>
        </InputIconWrapper>
        <StyledSelect value={sort} onChange={(e) => handleSort(e.target.value)}>
          <MenuItem value="Relevance">Relevance</MenuItem>
          <MenuItem value="Date asc">Date (Ascending)</MenuItem>
          <MenuItem value="Date desc">Date (Descending)</MenuItem>
          <MenuItem value="Calories asc">Calories (Ascending)</MenuItem>
          <MenuItem value="Calories desc">Calories (Descending)</MenuItem>
        </StyledSelect>
      </InputContainer>
    )
  }, [data, sort]) 
}
