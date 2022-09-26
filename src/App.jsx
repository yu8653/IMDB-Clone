import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import MovieList from "./components/movieList/MovieList";
import Movie from "./pages/movieDetail/Movie";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />}></Route>

          <Route path="movies/:type/:page" element={<MovieList />}></Route>
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="*" element={<h1>Page Not Found</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
