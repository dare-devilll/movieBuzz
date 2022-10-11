import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=7a16cbaf";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');



  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies(search);
  }, [search]);

  return (
    <div className="app">
      <h1 className="brand">Moviehub</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value = {search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src="{searchIcon}" alt="search" onClick={() => searchMovies(search)} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
