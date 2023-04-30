import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";

export const MovieView = ({ movies }) => {
    const { movieID } = useParams();
    const movie = movies.find((m) => m.id === movieID);

    const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie.id));
        window.scrollTo(0, 0);
    }, [movieID])

    const addFavorite = () => {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.username}/movies/${movieID}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
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
            methode: "DELETE",
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
                    setIsFavorite(true);
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }

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
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
            {isFavorite ?
                <Button onClick={removeFavorite}>Remove from Favorites</Button>
                : <Button onClick={addFavorite}>Add to Favorites</Button>}
        </div>
    );
};
