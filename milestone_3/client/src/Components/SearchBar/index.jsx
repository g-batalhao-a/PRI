import React from 'react';
import { styled } from '@mui/material/styles';
import { OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import InputContainer from '../InputContainer'
import InputIconWrapper from '../InputIconWrapper'

const StyledInputBase = styled(OutlinedInput)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(2, 1, 2, 1),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
  },
}));

export default function SearchBar({ handleSearch }) {
  const [search, setSearch] = React.useState("");

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(search)
    }
  }

  return (
    <InputContainer>
      <InputIconWrapper>
        <SearchIcon />
      </InputIconWrapper>
      <StyledInputBase
        placeholder="Search..."
        variant="outlined"
        value={search}
        onKeyUp={handleKeyDown.bind(this)}
        onChange={(e) => setSearch(e.target.value)}
      />
    </InputContainer>
  );
}
