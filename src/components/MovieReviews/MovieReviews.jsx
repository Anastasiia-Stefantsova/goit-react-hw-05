import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function MovieReviews() {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
    const fetchReviews = async () => {
        try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
            headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZThlZWM4NTYzYjBkYTJiY2QwNmI2MDljODEyNWFjMiIsIm5iZiI6MTcyMTY4MjE1NC45MjUwMzYsInN1YiI6IjY2OWVjMjBkZjMxM2ZmMjJiMzdkMjhhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1iJ3HaT2kDskjphneTLCMSKv4-F0oDQ3Tau7vERNMKA'
            }
        });
        setReviews(response.data.results);
        } catch (error) {
        console.error('Failed to fetch reviews:', error);
        }
    };

    fetchReviews();
    }, [movieId]);

    return (
    <div>
        <ul>
        {reviews.map(review => (
            <li key={review.id}>
            <p>{review.author}: {review.content}</p>
            </li>
        ))}
        </ul>
    </div>
    );
}