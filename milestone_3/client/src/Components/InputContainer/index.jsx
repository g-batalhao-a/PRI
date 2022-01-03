import { styled, alpha } from '@mui/material/styles';

const InputContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    color: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.35),
    },
}));

export default InputContainer