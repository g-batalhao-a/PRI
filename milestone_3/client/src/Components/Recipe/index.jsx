import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardHeader, CardContent, CardActions, Collapse, Typography, IconButton, ImageList, ImageListItem, Divider, Chip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RecipeContainer } from './style'
import { format } from "date-fns";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Recipe({ data }) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <RecipeContainer>
      <Card>
        <CardHeader
          title={data.Name}
          subheader={data.Category}
        />
        <CardContent sx={{padding: '0px 16px'}}>
          <Typography variant="body2" color="text.secondary">
            {data.Description}
          </Typography>
          <Typography variant="caption">
            { data.Keywords.map((item, idx) => {
                if (idx !== 0) return ", " + item
                else return item
              })}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{padding: '16px'}}>
          <Typography variant="body2" color="text.secondary">{data.AuthorName} | {format(new Date(data.Date), "MMMM do, yyyy")}</Typography>
          
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Divider>
              <Chip label="Ingredients" />
            </Divider>
            <ul>
              { data.Ingredients.map(item => <li key={item}>{item}</li>)}
            </ul>

            <Divider>
              <Chip label="Instructions" />
            </Divider>
            <ol>
              { data.Instructions.map(item => <li key={item}>{item}</li>)}
            </ol>
            
            <Divider>
              <Chip label="Images" />
            </Divider>
            { data.Images ?
              <ImageList cols={5} sx={{padding:'0px 16px'}}>
              {data.Images.map((item) => (
                <ImageListItem key={item}>
                  <img
                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={data.Name}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
            : "No Images"  
          }
          </CardContent>
        </Collapse>
      </Card>
    </RecipeContainer>
  );
}
