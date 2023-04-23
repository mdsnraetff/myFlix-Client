import Col from 'react-bootstrap/Col';

<Col md={8}>
    <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} />
</Col>

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
