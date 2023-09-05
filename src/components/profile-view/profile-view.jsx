import { useState } from "react";
import { Card, Col, Form, Button, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onLoggedOut, updateUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const FavoriteMovies = movies.filter((movie) => user.FavoriteMovies?.includes(movie.id));


    //Update user
    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthday
        }

        fetch(`https://my-flix-movies.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Update failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Update complete");
                    updateUser(user);
                }
            })
            .catch(e => {
                alert(e);
            });
    }
    //Delete user
    const deleteUser = () => {
        fetch(`https://my-flix-movies.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                if (response.ok) {
                    alert("User has been deleted");
                    onLoggedOut();
                } else {
                    alert("Delete failed");
                }
            })
            .catch(e => {
                alert(e);
            });
    }

    //Profile view
    //Delete acct.
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title>User Info</Card.Title>
                    <p>Username: {user.Username}</p>
                    <p>Email: {user.Email}</p>
                    <p>Birthday: {user.Birthday}</p>
                </Card.Body>
            </Card>
            <Button onClick={() => {
                if (confirm("Delete account?")) {
                    deleteUser();
                }
            }}>Delete Account</Button>

            <Card>
                <Card.Body>
                    <Card.Title>Update User Info</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="text"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="text"
                                value={birthday}
                                onChange={e => setBirthday(e.target.value)}
                                required />
                        </Form.Group>
                        <Button type="submit">Submit Changes</Button>
                    </Form>
                </Card.Body>


                <Row className="text-black">
                    <h3>Movies You Love:</h3>
                    {FavoriteMovies.map((movie) => (
                        <Col className="mb-5" key={movie.id} md={3}>
                            <MovieCard movie={movie}></MovieCard>
                        </Col>

                    ))} </Row> </Card>
        </>
    )

}