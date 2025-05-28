import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './movieCard';
import MovieModal from './movieModal';
import { type Movie } from './types';
import './movieList.css';

// Axios 오류 타입 보호 함수
function isAxiosError(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        typeof (error as any).message === 'string'
    );
}

const MovieList = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        axios
            .get<{ results: Movie[] }>('https://api.themoviedb.org/3/movie/popular', {
                params: {
                    api_key: apiKey,
                    language: 'ko-KR',
                    region: 'KR',
                    page: 1,
                },
            })
            .then((res) => setMovies(res.data.results))
            .catch((err: unknown) => {
                if (isAxiosError(err)) {
                    console.error('Axios 에러:', err.message);
                } else {
                    console.error('알 수 없는 에러:', err);
                }
            });
    }, []);

    const handleCardClick = (movie: Movie) => setSelectedMovie(movie);
    const handleCloseModal = () => setSelectedMovie(null);

    return (
        <div>
            <h2 className="head">Movie List</h2>
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onClick={handleCardClick} />
                ))}
            </div>

            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default MovieList;
