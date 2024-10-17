import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "/public/assets/logo.png";
import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fs-6">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img src={logo} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav ms-auto">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#explore">How it Works</Nav.Link>
            <Nav.Link href="#testimonials">Top Players</Nav.Link>
            <Link to="/signup" className="text-decoration-none">
              <Nav.Link href="#link">Sign Up</Nav.Link>
            </Link>
            <Link to="/signin">
              <Button className="btn">Sign In</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
