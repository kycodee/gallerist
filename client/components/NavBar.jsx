import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function NavBar() {
  const location = useLocation();
  return (
    <>
      <Navbar expand="lg" className="sticky-top" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <strong>GLLRST</strong>
          </Navbar.Brand>
          <Nav activeKey={location.pathname}>
            <Nav.Link as={NavLink} eventKey="search" to="search">
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="profile" to="profile">
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="gallery" to="gallery">
              Gallery
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="auction" to="auction">
              Auction
            </Nav.Link>
            <form action="/logout" method="post">
              <Button variant="secondary" type="submit">
                Sign out
              </Button>
            </form>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <Outlet />
    </>
  );
}

export default NavBar;
