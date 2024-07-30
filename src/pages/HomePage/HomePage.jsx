import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZThlZWM4NTYzYjBkYTJiY2QwNmI2MDljODEyNWFjMiIsIm5iZiI6MTcyMTY4MjE1NC45MjUwMzYsInN1YiI6IjY2OWVjMjBkZjMxM2ZmMjJiMzdkMjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iJ3HaT2kDskjphneTLCMSKv4-F0oDQ3Tau7vERNMKA'
          }
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending todey</h1>
      <MovieList movies={movies} />
    </div>
  );
}