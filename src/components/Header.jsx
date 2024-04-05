import React from 'react'

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { NavLink } from 'react-router-dom'

function Header () {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="sticky-top">
        <Container>
          <Navbar.Brand href="#home">Rick & Morty</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='home'>Home</Nav.Link>
            <NavLink to='/character-location'>
              <Nav.Link href='character-location'>Character Location</Nav.Link>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header