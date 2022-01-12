import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, ImageList, ImageListItem, Chip, Card, Divider, CardContent, LinearProgress } from "@mui/material";
import StyledRating from '../Components/StyledRating'
import { format } from "date-fns";

function parseSeconds(seconds) {
  const numyears = Math.floor(seconds / 31536000);
  const numdays = Math.floor((seconds % 31536000) / 86400); 
  const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;

  let str = ""
  if (numyears > 0) str += numyears + " years "
  if (numdays > 0) str += numdays + " days "
  if (numhours > 0) str += numhours + " hours "
  if (numminutes > 0) str += numminutes + " minutes "
  if (numseconds > 0) str += numseconds + " seconds"

  if (str === "") str += "Instant"

  return str;
}

export default function Recipe() {
  const { RecipeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    setIsLoading(true)
    fetch(`http://localhost:3001/recipe/${RecipeId}`, {})
      .then((res) => res.json())
      .then((response) => {
        console.log(response)
        setRecipe(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [RecipeId]);

  const parseReview = (string) => {
    const stars = parseInt(string.substring(1,string.indexOf(" ")))
    const username = (string.substring(string.indexOf(",")+1, string.indexOf("}"))).trim()
    const review = (string.substring(string.indexOf("}")+1)).trim()
    return {stars: stars, username: username, review: review}
  }

  if (isLoading) {
    return (
      <LinearProgress/>
    )
  }

  return (
    <Container sx={{padding: 2}} maxWidth="lg">
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12}>
          <Typography variant="h4" color="secondary">{recipe.Name}</Typography>
          <Typography variant="button" color="secondary">{recipe.Category}</Typography>
        </Grid>
        {recipe.AggregatedRating && recipe.ReviewCount && (
          <Grid item xs={12} container alignItems="center">
            <StyledRating value={recipe.AggregatedRating} color="primary" precision={0.1} readOnly/>
            <Typography variant="button" color="text.secondary">
              ({recipe.ReviewCount})
            </Typography>
          </Grid>
        )}
        {recipe.Keywords && (
          <Grid container item direction="row" spacing={1}>
            {Array.from(recipe.Keywords).map((value, idx)=> (
              <Grid item key={idx}>
                <Chip label={value} color="primary" size="large"/>
              </Grid>
            ))}
          </Grid>
        )}
        {recipe.Description && (
          <Grid item xs={12} >
            <Typography variant="body1" color="secondary">{recipe.Description}</Typography>
          </Grid>
        )}
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" color="secondary">Preparation Time: </Typography>
            <Typography variant="button" color="text.secondary">{parseSeconds(recipe.PrepTime)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" color="secondary">Cooking Time: </Typography>
            <Typography variant="button" color="text.secondary">{parseSeconds(recipe.CookTime)}</Typography>
          </Grid>
        </Grid>
        <Grid container item xs={6}>
          <Grid item xs={12}>
            <Typography variant="h6" color="secondary">Nutritional Information</Typography>
            <Grid container direction="column" alignItems="flex-start">
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Calories: {recipe.Calories}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Fat: {recipe.FatContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Saturated Fat: {recipe.SaturatedFatContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Cholestorol: {recipe.CholesterolContent} mg</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Carbohydrate: {recipe.CarbohydrateContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Dietary Fiber: {recipe.FiberContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Sugars: {recipe.SugarContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Protein: {recipe.ProteinContent} g</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="button" color="text.secondary">Sodium: {recipe.SodiumContent} mg</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {recipe.Ingredients && (
          <Grid container item xs={6} direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="h6" color="secondary">Ingredients</Typography>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              {Array.from(recipe.Ingredients).map((value, idx)=> (
                <Grid item key={idx}>
                  <Typography variant="button" color="text.secondary" >- {value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {recipe.Instructions && (
          <Grid container item xs={12} direction="column" alignItems="flex-start">
            <Grid item>
              <Typography variant="h6" color="secondary">Instructions</Typography>
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
              {Array.from(recipe.Instructions).map((value, idx)=> (
                <Grid item key={idx}>
                  <Typography variant="body1" color="text.secondary" >{idx+1}. {value}</Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {recipe.Images && (
          <Grid item>
            <ImageList gap={12} cols={4} style={{padding: 10}}>
              {recipe.Images.map((item, idx) => (
                <ImageListItem key={idx} >
                  <img
                    style={{boxShadow: '3px 3px 3px rgba(0,0,0,0.5)'}}
                    src={`${item}`}
                    srcSet={`${item}`}
                    alt={recipe.Name}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant="body2" color="secondary">{recipe.AuthorName} | {format(new Date(recipe.Date), "MMMM do, yyyy")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider/>
        </Grid>
        {recipe.Reviews && (
          <Grid item container direction="column" alignItems="flex-start">
            <Typography variant="h6" color="secondary">Reviews</Typography>
            <Grid container spacing={4} direction="column" alignItems="flex-start">
              {Array.from(recipe.Reviews).map((value, idx) => {
                const obj = parseReview(value)
                return (
                  <Grid item key={idx} sx={{width: 1}} >
                    <Card style={{backgroundColor: "white"}}>
                      <CardContent>
                        <Grid container alignItems="center" sx={{ marginBottom: '0.5em' }}>
                          <Typography variant="h6" color="text.primary" sx={{ marginRight: '0.5em' }}>{obj.username}</Typography>
                          <StyledRating readOnly value={obj.stars}/> 
                        </Grid>
                        <Typography variant="body1" color="text.secondary">{obj.review}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )}
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};