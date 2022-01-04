import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar"
import Search from "./Pages/Search";
import Recipe from "./Pages/Recipe";
import { SearchProvider } from './Context/SearchContext';

export default function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={
          <SearchProvider>
            <Search/>
          </SearchProvider>
        } />
        <Route path="/recipe/:RecipeId" element={<Recipe/>} />
      </Routes>
    </Router>
  );
}
