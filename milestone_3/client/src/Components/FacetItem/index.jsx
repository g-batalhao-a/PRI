import React from 'react';
import { FormControlLabel, Checkbox, Stack, Typography } from '@mui/material';

export default function FacetItem({ value, count }) {
  return (
    <FormControlLabel
      control={<Checkbox />}
      label={
        <Stack direction="row" spacing={0.5}>
          <Typography variant="body1" color="secondary" sx={{textTransform: 'capitalize'}}>{value}</Typography>
          <Typography variant="button" color="primary">({count})</Typography>
        </Stack>
      } 
    />
  );
}