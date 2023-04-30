import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.jsx";

export const MovieView = ({ movie }) => {
    const { movieID } = useParams();
    const movie = movies.find((m) => m.id === movieId);
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
        </div>
    );
};
