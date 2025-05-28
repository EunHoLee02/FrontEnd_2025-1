import './movieCard.css';
import { type Movie } from './types';

interface Props {
    movie: Movie;
    onClick: (movie: Movie) => void;
}

function MovieCard({ movie, onClick }: Props) {
    const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <img src={`${imageBaseUrl}${movie.poster_path}`} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>⭐ {movie.vote_average.toFixed(1)}</p>
        </div>
    );
}

export default MovieCard;
