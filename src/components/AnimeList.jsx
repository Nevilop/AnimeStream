import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime');
        if (!response.ok) throw new Error('Failed to fetch anime list');
        const data = await response.json();
        setAnimeList(data.data || []);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    fetchAnime();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-danger fw-bold"> Your Favorite Anime</h1>
      <p className="mb-5 text-secondary">Browse all your favorite anime in one place. </p>
      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
          <Spinner animation="border" variant="danger" />
        </div>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {!loading && !error && animeList.map(anime => (
          <Col key={anime.mal_id} md={3} sm={6} xs={12} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '/placeholder.svg'} alt={anime.title} style={{ height: '250px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{anime.title_english || anime.title}</Card.Title>
                <Card.Text>{anime.synopsis ? anime.synopsis.substring(0, 80) + '...' : 'No synopsis available.'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AnimeList