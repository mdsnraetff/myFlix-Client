import PropTypes from "prop-types";
import { Button, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const MovieView = ({ movies, user, token }) => {
    const { movieID } = useParams();
    const movie = movies.find((m) => m.id === movieID);

    const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie.id));
        window.scrollTo(0, 0);
    }, [movieID])

    const addFavorite = () => {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.Username}/movies/${movieID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Error");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("This movie has been added to your favorites");
                    setIsFavorite(true);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    const removeFavorite = () => {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.username}/movies/${movieID}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Error");
                return false;
            }
        })
            .then(user => {
                if (user) {
                    alert("This movie has been added to your favorites");
                    setIsFavorite(false);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    return (
        <Card className="mt-1 mb-1 h-100 bg-secondary text-white">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Description: {movie.Description}</Card.Text>
                <Card.Text>Director: {movie.Director.Name}</Card.Text>
                <Card.Text>Bio: {movie.Director.Bio}</Card.Text>
                <Card.Text>Genre: {movie.Genre.Name}</Card.Text>
                <Card.Text>Description: {movie.Genre.Description}</Card.Text>
            </Card.Body>

            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            {
                isFavorite ? (
                    <Button onClick={removeFavorite}>Remove from Favorites</Button>)
                    : (<Button onClick={addFavorite}>Add to Favorites</Button>)
            }
        </Card>)
}
