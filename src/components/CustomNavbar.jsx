import React, { useState } from 'react'
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{height:"80px"}} >
    <Container>
      <Navbar.Brand href="/">
        <img
          alt="AnimeFlix Logo"
          src="https://cdn-icons-png.flaticon.com/512/616/616494.png"
          width="30"
          height="30"
          className="d-inline-block align-top me-2"
        />
        AnimeFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto">
          
          <Nav.Link href="#">Trending</Nav.Link>
          <Nav.Link href="#">Popular</Nav.Link>
        </Nav>
        <Form className="d-flex me-2" onSubmit={handleSubmit}>
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width: '300px'}}
          />
          <Button variant="outline-light" type="submit">Search</Button>
        </Form>
        <Nav>

             <Nav.Link as={Link} to="/login" style={{ fontSize: '1.2rem'}}>Login</Nav.Link>
          <Nav.Link href="#">
            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default CustomNavbar