import React from 'react';
import { Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar"
import SearchPage from "./SearchPage";
import RecipePage from "./RecipePage";

export default function App() {
  return (
    <>
      <NavBar></NavBar>
      <Routes>
        <Route exact path="/" element={<SearchPage/>} />
        <Route path="/recipe/:RecipeId" component={<RecipePage/>} />
      </Routes>
    </>
    
  );
}
