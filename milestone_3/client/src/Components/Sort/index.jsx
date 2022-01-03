import React from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import InputContainer from '../InputContainer'
import InputIconWrapper from '../InputIconWrapper'

const StyledSelect = styled(Select)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export default function Sort({ handleSort }) {
  return (
    <InputContainer>
      <InputIconWrapper>
        <SortIcon/>
      </InputIconWrapper>
      <StyledSelect defaultValue="Relevance" onChange={(e) => handleSort(e.target.value)}>
        <MenuItem value="Relevance">Relevance</MenuItem>
        <MenuItem value="Date asc">Date (Ascending)</MenuItem>
        <MenuItem value="Date desc">Date (Descending)</MenuItem>
      </StyledSelect>
    </InputContainer>
  );
}
