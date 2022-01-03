import { styled } from '@mui/material/styles';
import { Rating } from '@mui/material';

const StyledRating = styled(Rating)(({ theme }) => ({
    '& .MuiRating-iconFilled': {
      color: theme.palette.secondary.main,
    },
    '& .MuiRating-iconEmpty': {
      color: theme.palette.primary.main,
    },
    '& .MuiRating-iconHover': {
      color: theme.palette.secondary.main,
    },
  }));

export default StyledRating