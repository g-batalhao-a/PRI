import React from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Stack } from '@mui/material';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import LaunchIcon from '@mui/icons-material/Launch';
import StyledRating from '../StyledRating'

export default function Recipe({ data }) {
  return (
    <div style={{ margin: '1em 0' }}>
      <Card>
        <CardHeader title={data.Name} subheader={data.Category} style={{paddingBottom: 0}}/>
        <CardContent sx={{padding: '0px 16px'}}>
          {data.AggregatedRating && data.ReviewCount && 
            <Stack direction="row" spacing={1}>
              <StyledRating value={data.AggregatedRating} color="primary" precision={0.5} readOnly/>
              <Typography variant="button" color="text.secondary">
                ({data.ReviewCount})
              </Typography>
            </Stack>
          }
          <Typography variant="body2" color="text.secondary">
            {data.Description}
          </Typography>
          <Typography variant="caption" color="secondary">
            { data.Keywords && data.Keywords.join(', ')}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{padding: '16px'}}>
          <Typography variant="body2" color="secondary">{data.AuthorName} | {format(new Date(data.Date), "MMMM do, yyyy")}</Typography>
          <div style={{ marginLeft: 'auto' }}>
            <Link to={"/recipe/" + data.RecipeId}><LaunchIcon/></Link>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
