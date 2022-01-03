import React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../Assets/logo.svg';

const NavBarContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  padding: '1.5em 5em'
}));

export default function NavBar() {
  return (
    <NavBarContainer>
      <Link to="/"><Logo height={50}/></Link>
    </NavBarContainer>
  );
}
