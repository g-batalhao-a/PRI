import React from 'react';
import { Routes, Route } from "react-router-dom";

import SearchPage from "./SearchPage";
import RecipePage from "./RecipePage";

export default function App() {
  return (
    <Routes>
      <Route exact path="/" element={<SearchPage/>} />
      <Route path="/recipe/:RecipeId" component={<RecipePage/>} />
    </Routes>
  );
}
