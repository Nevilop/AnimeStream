import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Get the search query from the URL
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          setResults(data.data || []);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div>
        
    <div className="container mt-4">
      <h2>Search Results for "{query}"</h2>
      {loading && <p>Loading...</p>}
      <Row>
        {results.map(anime => (
          <Col md={4} lg={3} sm={6} xs={12} key={anime.mal_id} className="mb-4">
            <Card bg="dark" text="light" className="h-100">
              <Card.Img variant="top" src={anime.images?.jpg?.image_url || "/placeholder.svg"} alt={anime.title} style={{ height: '300px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{anime.title_english || anime.title}</Card.Title>
                <Card.Text>
                  {anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : 'No synopsis available.'}
                </Card.Text>
                <Link to={`/anime/${anime.mal_id}`} className="btn btn-danger btn-sm">View Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    </div>
  );
};

export default SearchResults;