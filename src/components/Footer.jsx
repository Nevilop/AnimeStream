import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark border-top border-secondary mt-4 text-light">
      <Container className="py-4">
        <Row>
          <Col md={3}>
            <h5 className="text-danger mb-3 fw-bold">AnimeFlix</h5>
            <p className="text-secondary">Your ultimate destination for anime trailers and streaming.</p>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Browse</h6>
            <ul className="list-unstyled text-secondary">
              <li><a href="#" className="text-secondary text-decoration-none">Popular</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">New Releases</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Top Rated</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Genres</h6>
            <ul className="list-unstyled text-secondary">
              <li><a href="#" className="text-secondary text-decoration-none">Action</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Romance</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Comedy</a></li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled text-secondary">
              <li><a href="#" className="text-secondary text-decoration-none">Help Center</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-secondary text-decoration-none">Terms of Service</a></li>
            </ul>
          </Col>
        </Row>

        <hr className="border-secondary mt-4" />

        <p className="text-center text-secondary mb-0">&copy; 2025 AnimeFlix. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
