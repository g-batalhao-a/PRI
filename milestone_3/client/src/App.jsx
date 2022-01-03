import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NavBar from "./Components/NavBar"
import Search from "./Pages/Search";
import Recipe from "./Pages/Recipe";

export default function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Search/>} />
        <Route path="/recipe/:RecipeId" element={<Recipe/>} />
      </Routes>
    </Router>
  );
}
