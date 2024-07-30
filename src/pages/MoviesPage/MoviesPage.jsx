import React, { useContext, useEffect, useState } from 'react';
import { SearchContext } from '../../components/contexts/SearchContext';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Toaster, toast } from 'react-hot-toast';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
    const {searchResults, setSearchResults, query, setQuery } = useContext(SearchContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const queryParam = searchParams.get('query');
        if (queryParam) {
            setQuery(queryParam);
            handleSearch(queryParam);
        }
    }, [searchParams]);

    const handleSearch = async (searchQuery) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, {
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZThlZWM4NTYzYjBkYTJiY2QwNmI2MDljODEyNWFjMiIsIm5iZiI6MTcyMTY4MjE1NC45MjUwMzYsInN1YiI6IjY2OWVjMjBkZjMxM2ZmMjJiMzdkMjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iJ3HaT2kDskjphneTLCMSKv4-F0oDQ3Tau7vERNMKA'
                }
            });
            setSearchResults(response.data.results);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch search results');
            toast.error('Failed to fetch search results');
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter a valid search query');
            return;
        }
        setSearchParams({ query });
    };

    return (
        <div className={css.container}>
            <Toaster />
            <form onSubmit={handleSearchSubmit}>
                <input 
                    type="text"  
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading...</p>}
            {error && <ErrorMessage message={error} />}
            {query && !loading && !error && (
                <div>
                    <MovieList movies={searchResults} />
                </div>
            )}
        </div>
    );
}