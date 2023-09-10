import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar, Navbar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { MovieFilter } from "../movie-filter/movie-filter";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { InputGroup, Form } from "react-bootstrap";



export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTitle, setSelectedTitle] = useState("");

    const updateUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    }


    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://my-flix-movies.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        image: movie.Image,
                        director: {
                            name: movie.Director.Name,
                            bio: movie.Director.Bio
                        },
                        genre: {
                            name: movie.Genre.Name,
                            description: movie.Genre.Description
                        },
                    };
                });

                setMovies(moviesFromApi);

                console.log('7', moviesFromApi)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [token]);

    const movieFilter = () => {
        let filteredMovies = movies;

        if (selectedTitle) {
            filteredMovies = filteredMovies.filter((movie) => movie.title === selectedTitle);
        };

        if (searchTerm) {
            filteredMovies = filteredMovies.filter((movie) => movie.title.includes(searchTerm.toLowerCase())
            );
        }

        return filteredMovies;
    };


    const filteredMovies = movieFilter();

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Container>
                <MovieFilter
                    selectedTitle={selectedTitle}
                    setSelectedTitle={setSelectedTitle}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm} />
                <Row className="justify-content-md-center">
                    <Routes>
                        <Route
                            path="/profile"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <ProfileView user={user} token={token} movies={movies} setUser={setUser} onLoggedOut={() => {
                                            setUser(null);
                                            setToken(null);
                                            localStorage.clear();
                                        }} updateUser={updateUser} />
                                    )
                                    }
                                </>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )
                                    }
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <LoginView
                                                onLoggedIn={(user, token) => {
                                                    setUser(user);
                                                    setToken(token);
                                                }} />
                                            or
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:movieId"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : movies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView
                                                movies={movies}
                                                user={user}
                                                setUser={setUser}
                                                token={token} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : filteredMovies.length === 0 ? (
                                        <Col>The list is empty!</Col>
                                    ) : (
                                        <>
                                            {filteredMovies.map((movie) => (
                                                <Col className="mb-2 d-flex" key={movie.id} md={3}>
                                                    <MovieCard
                                                        movie={movie} />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </Row>
            </Container>
        </BrowserRouter>
    );
};