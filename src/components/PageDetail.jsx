import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Button
} from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { Heart, ArrowLeft, Calendar, Star, Tv, Share2, ExternalLink } from 'react-feather'; // or your icon library
import CustomNavbar from './CustomNavbar';

const platforms = [
  {
    name: 'Netflix',
    url: 'https://www.netflix.com/',
  },
  {
    name: 'Crunchyroll',
    url: 'https://www.crunchyroll.com/',
  },
  {
    name: 'Funimation',
    url: 'https://www.funimation.com/',
  },
];

const PageDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    if (!id) {
      console.log("No id param found!");
      return;
    }
    console.log("Fetching anime with id:", id);
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log("Fetched data:", data);
        setAnime(data.data);
      });
  }, [id]);

  if (!anime) return <p>Loading...</p>;

  return (
    <div>
        
      <Container className="py-4">
        <Link to="/">
          <Button variant="outline-secondary inline-dark" className="mb-4">
            <ArrowLeft className="me-2" />
            Back to Home
          </Button>
        </Link>

        <Row>
          {/* Left Column */}
          <Col lg={4}>
            <div className="sticky-top" style={{ top: '8px', paddingTop: '20px' }}>
              <img
                src={anime.images?.jpg?.large_image_url || "/placeholder.svg"}
                alt={anime.title}
                className="img-fluid rounded shadow mb-3"
              />
              <div className="d-grid gap-2 mb-4">
                <Button className="bg-danger text-white">
                  <Heart className="me-2" />
                  Add to Favorites
                </Button>
                <Button variant="outline-light">
                  <Share2 className="me-2" />
                  Share
                </Button>
              </div>
            </div>
          </Col>

          {/* Right Column */}
          <Col lg={8}>
            <h1 className="display-5 fw-bold mb-3" style={{color:"black"}}>{anime.title_english || anime.title}</h1>
            <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
              <div className="d-flex align-items-center">
                <Star className="text-warning me-2" />
                <span className="fw-semibold h5 mb-0">{anime.score}</span>
              </div>
              <div className="d-flex align-items-center">
                <Calendar className="text-secondary me-2" />
                <span>{anime.year}</span>
              </div>
              <div className="d-flex align-items-center">
                <Tv className="text-secondary me-2" />
                <span>{anime.episodes} Episodes</span>
              </div>
              <Badge bg="secondary">{anime.status}</Badge>
              {anime.rating && <Badge bg="primary">{anime.rating}</Badge>}
            </div>

            <div className="mb-4">
              {anime.genres && anime.genres.map((g) => (
                <Badge key={g.mal_id} bg="secondary" className="me-2">{g.name}</Badge>
              ))}
            </div>

            {anime.trailer?.youtube_id && (
              <Card bg="dark" text="light" className="mb-4 border-secondary">
                <Card.Body className="p-0">
                  <div className="ratio ratio-16x9">
                    <iframe
                      src={`https://www.youtube.com/embed/${anime.trailer.youtube_id}?enablejsapi=1&origin=${window.location.origin}`}
                      title={`${anime.title} Trailer`}
                      allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                  </div>
                </Card.Body>
              </Card>
            )}

            <h2 className="h4 fw-bold mb-3">Synopsis</h2>
            <p className="text-dark">{anime.synopsis}</p>

            <Row className="mb-4">
              <Col md={6}>
                <Card bg="dark" text="light" className="border-secondary mb-3">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Details</h5>
                    <div className="d-flex justify-content-between"><span className="text-secondary">Studio:</span><span>{anime.studios && anime.studios.map(s => s.name).join(', ')}</span></div>
                    <div className="d-flex justify-content-between"><span className="text-secondary">Source:</span><span>{anime.source}</span></div>
                    <div className="d-flex justify-content-between"><span className="text-secondary">Episodes:</span><span>{anime.episodes}</span></div>
                    <div className="d-flex justify-content-between"><span className="text-secondary">Duration:</span><span>{anime.duration}</span></div>
                    <div className="d-flex justify-content-between"><span className="text-secondary">Type:</span><span>{anime.type}</span></div>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card bg="dark" text="light" className="border-secondary mb-3">
                  <Card.Body>
                    <h5 className="fw-bold mb-3">Aired</h5>
                    <div className='text-center mt-3 font-weight-bold font-size-16'>{anime.aired?.string}</div>
                    <div className="text-center mt-5"style={{fontSize: '16px',color: 'pink',fontWeight: 'bold',height: '48px', paddingTop: '15px'  }}>
                   Let's Make Anime Streaming Website Great Again
                   </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <h2 className="h4 fw-bold mb-3">Watch On</h2>
            <Row>
              {platforms.map((platform, index) => (
                <Col md={4} key={index} className="mb-3">
                  <Card bg="dark" text="light" className="border-secondary">
                    <Card.Body className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <span>{platform.name}</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-danger text-white"
                        onClick={() => window.open(platform.url, "_blank")}
                      >
                        <ExternalLink className="me-1" />
                        Watch
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PageDetail;
