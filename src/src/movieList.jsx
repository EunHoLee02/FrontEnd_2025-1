import { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './movieCard';
import MovieModal from './movieModal';
import './movieList.css';

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: apiKey,
                language: 'ko-KR',
                region: 'KR',
                page: 1,
            }
        }).then(res => setMovies(res.data.results))
            .catch(err => console.error('API 호출 실패:', err));
    }, []);

    const handleCardClick = (movie) => setSelectedMovie(movie);
    const handleCloseModal = () => setSelectedMovie(null);

    return (

        <div>
            <h2 className="head">Movie List</h2>
            <div className="movie-list">
                {movies.map(movie => (
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
