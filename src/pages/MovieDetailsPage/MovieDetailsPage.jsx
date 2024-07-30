import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const locationRef = useRef(location.state?.from);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZThlZWM4NTYzYjBkYTJiY2QwNmI2MDljODEyNWFjMiIsIm5iZiI6MTcyMTY4MjE1NC45MjUwMzYsInN1YiI6IjY2OWVjMjBkZjMxM2ZmMjJiMzdkMjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iJ3HaT2kDskjphneTLCMSKv4-F0oDQ3Tau7vERNMKA'
                    }
                });
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        if (movieId) {
            fetchMovieDetails();
        }
    }, [movieId]);

    const handleGoBack = () => {
        if (locationRef.current) {
            navigate(locationRef.current);
        } else {
            navigate('/movies');
        }
    };

    if (!movie) return <div>Loading...</div>;

    return (
        <div>
            <button onClick={handleGoBack} className={css.btn}>Go back</button>
            <div className={css.container}>
                <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title} 
                    className={css.img}
                />
                <div className={css.title}>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                </div>
            </div>
            <nav className={css.nav}>
                <h2 className={css.h2}>Additional information</h2>
                <Link to="cast" state={{ from: locationRef.current}}>Cast</Link>
                <Link to="reviews" state={{ from: locationRef.current}}>Reviews</Link>
            </nav>
            <Outlet />
        </div>
    );
}