import '../movie-card/movie-card.scss';
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


export const MovieCard = ({ movie, user, token, setUser }) => {


    console.log('line 7', movie)


    return (
        <Card className="movieCard">
            <Card.Img className="movieCardimage" variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button className="movieCardbutton" variant="link">Open</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};
MovieCard.propTypes = {
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
    }).isRequired,

};