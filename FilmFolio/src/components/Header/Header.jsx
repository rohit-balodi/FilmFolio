
import { Button,  Container, Form, Nav, Navbar} from "react-bootstrap";
import './Header.css';
import React from "react";

export default function Header({setSearch}) {
  const submitHandler = (e) => {
    e.preventDefault();
    setSearch(e.target[0]?.value)
  }
  return (
      <Navbar bg="dark" sticky="top" variant="dark" expand="lg" style={{padding: '2rem'}}>
        <Container fluid>
          <Navbar.Brand className="brandName" href="/"><span>Movies on the Tip</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
            <Nav.Link href="/movies/now_playing">Movies in Theaters</Nav.Link>
            <Nav.Link href="/movies/upcoming">Coming Soon</Nav.Link>
            <Nav.Link href="/movies/top_rated">Top Rated Movies</Nav.Link>
            <Nav.Link href="/favourites">Favourites</Nav.Link>
            </Nav>

            <Nav>
              <Form className="d-flex" onSubmit={submitHandler}>
              <Form.Control
                type="search"
                placeholder="Enter Movie Name"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
