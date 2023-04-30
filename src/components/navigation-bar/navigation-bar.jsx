import { createRoot } from "react-dom/client";
import { MainView } from "../main-view/main-view";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../index.scss";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom"

export const NavigationBar = ({ user, onLoggedOut }) => {

    const container = document.querySelector("#root");
    const root = createRoot(container);
    root.render(<App />);

    const App = () => {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand as={Link} to="/">
                    Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to={`/login`}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/signup`}>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to={`/`}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to={`/users`}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };
};

