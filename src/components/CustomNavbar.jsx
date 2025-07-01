import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CustomNavbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
    alert('Login Successful!');
    navigate('/'); // This line redirects to home
  } catch (err) {
    alert(err.message);
  }
};

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{ height: "80px" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">
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
            <Nav.Link as={Link} to="#">Trending</Nav.Link>
            <Nav.Link as={Link} to="#">Popular</Nav.Link>
          </Nav>
          <Form className="d-flex me-2" onSubmit={handleSubmit}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px' }}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>
          <Nav>
            {currentUser ? (
              <>
                <Nav.Link onClick={handleLogout} style={{ fontSize: '1.2rem' }}>
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" style={{ fontSize: '1.2rem' }}>
                Login
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="#">
              <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
