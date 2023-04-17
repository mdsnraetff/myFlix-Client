import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};
MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.shape({
            description: '...',
        }),
        director: PropTypes.shape({
            name: '...',
            bio: '...',
        }),
        genre: PropTypes.shape({
            name: '...',
            description: '...',
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};