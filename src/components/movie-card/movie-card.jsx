import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    Open
                </Button>
            </Card.Body>
        </Card>
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