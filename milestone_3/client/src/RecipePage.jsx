import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SearchPage({ match }) {
  const {
    params: { RecipeId },
  } = match;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`http://localhost:3001/recipe/${RecipeId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [RecipeId]);

  return (
    <>
      {!isLoading && (
        <>
          <h1>Name: {data.Name}</h1>
          <Link to="/">Back to search</Link>
        </>
      )}
    </>
  );
};