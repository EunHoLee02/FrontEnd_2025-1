import './movieModal.css';

function MovieModal({ movie, onClose }) {
    if (!movie) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <img
                    className="modal-image"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />

                <div className="modal-details">
                    <h2>{movie.title}</h2>

                    {movie.release_date && (
                        <p><strong>개봉일:</strong> {movie.release_date}</p>
                    )}

                    {movie.vote_average !== 0 && movie.vote_average && (
                        <p>
                            <strong>평점:</strong>
                            <span className="rating">⭐ {movie.vote_average.toFixed(1)}</span>
                        </p>
                    )}

                    {movie.overview && (
                        <>
                            <p><strong>줄거리:</strong></p>
                            <p>{movie.overview}</p>
                        </>
                    )}
                </div>

                <button className="close-btn" onClick={onClose}>×</button>
            </div>
        </div>
    );
}

export default MovieModal;
