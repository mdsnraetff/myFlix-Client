import PropTypes from "prop-types";
import { Button, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { useState, useEffect } from "react";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);
    const [isFavorite, setIsFavorite] = useState(false);

    //const [isFavorite, setIsFavorite] = useState(user.favoriteMovies?.includes(movie.id));

    useEffect(() => {

        // if (user.favorite_movies && user.favorite_moves.includes(movie.id)) {
        //     setIsFavorite(true);
        setIsFavorite(user.FavoriteMovies?.includes(movie.id));
        window.scrollTo(0, 0);
    }, [movieId])

    const addFavorite = () => {
        //fetch("https://my-flix-movies.herokuapp.com/users/" + user.Username + "/" + movie.id, {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.Username}/${movie.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                if (data) {
                    setIsFavorite(true);
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                    alert("This movie has been added to your favorites");
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    const removeFavorite = () => {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.Username}/${movie.id}`, {
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
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
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
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Description: {movie.description}</Card.Text>
                <Card.Text>Director: {movie.director.name}</Card.Text>
                <Card.Text>Bio: {movie.director.bio}</Card.Text>
                <Card.Text>Genre: {movie.genre.name}</Card.Text>
                <Card.Text>Description: {movie.genre.description}</Card.Text>
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
MovieView.propTypes = {
    movie: PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        director: PropTypes.shape({
            name: PropTypes.string,
            bio: PropTypes.string,
        }),
        genre: PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
        })
    })

};
