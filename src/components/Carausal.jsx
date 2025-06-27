"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules"
import { Container, Row, Col, Button, Badge, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"


import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"
import "bootstrap/dist/css/bootstrap.min.css"

const BASE_URL = "https://api.jikan.moe/v4/top/anime"

const Carausal = () => {
    const navigate = useNavigate()
    const [animeData, setAnimeData] = useState([])
    const [anime, setAnime] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      const fetchAnimeData = async () => {
        try {
          setLoading(true)
          // Add a small delay to avoid rate limiting
          const response = await fetch(`${BASE_URL}?limit=15`)
  
          if (!response.ok) {
            throw new Error(`API error: ${response.status}`)
          }
  
          const data = await response.json()
          setAnimeData(data.data)
          setLoading(false)
        } catch (err) {
          console.error("Error fetching anime data:", err)
          setError(err instanceof Error ? err.message : "An unknown error occurred")
          setLoading(false)
        }
      }
  
      fetchAnimeData()
    }, [])
  
    useEffect(() => {
      fetch(BASE_URL)
        .then((r) => r.json())
        .then((json) => setAnime(json.data.slice(0, 20))) // first 20
        .catch(console.error)
        .finally(() => setLoading(false))
    }, [])
  
   // to truncate text
    const truncateText = (text, maxLength) => {
      if (!text) return ""
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text
    }
  
    //  navigate to anime detail page
    const handleAnimeClick = (animeId) => {
      navigate(`/anime/${animeId}`)
    }
  
    if (loading) {
      return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Spinner animation="border" variant="danger" />
          <span className="ms-2">Loading anime data...</span>
        </div>
      )
    }
  
    if (error) {
      return (
        <div className="alert alert-danger m-4" role="alert">
          Error loading anime data: {error}
        </div>
      )
    }
  
    return (
      <div className="anime-slider-container">
        {/* Hero Slider */}
        <section className="hero-slider mb-5 ">
          <Swiper
            effect={"fade"}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            loop={true}
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            className="hero-swiper"
          >
            {animeData.slice(0, 5).map((anime) => (
              <SwiperSlide key={`hero-${anime.mal_id}`}>
                <div
                  className="position-relative"
                  style={{
                    height: "70vh",
                    backgroundImage: `url(${anime.images.jpg.large_image_url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => handleAnimeClick(anime.mal_id)}
                >
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%)",
                    }}
                  ></div>
  
                  <Container className="position-relative h-100">
                    <Row className="h-100 align-items-center">
                      <Col md={7} className="text-white">
                        <div className="mb-3">
                          {anime.genres.slice(0, 3).map((genre) => (
                            <Badge key={genre.mal_id} bg="danger" className="me-2 rounded-pill">
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
  
                        <h1 className="display-4 fw-bold mb-3">{anime.title_english || anime.title}</h1>
  
                        <p className="mb-4">{truncateText(anime.synopsis, 200)}</p>
  
                        <div className="d-flex mb-4">
                          <div className="me-4">
                            <i className="bi bi-star-fill text-warning me-1"></i>
                            <span>{anime.score}</span>
                          </div>
                          <div className="me-4">
                            <i className="bi bi-collection-play me-1"></i>
                            <span>{anime.episodes || "?"} Episodes</span>
                          </div>
                          <div>
                            <i className="bi bi-calendar me-1"></i>
                            <span>{anime.year || "Unknown"}</span>
                          </div>
                        </div>
  
                        <div>
                          <Button
                            variant="danger"
                            className="me-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAnimeClick(anime.mal_id)
                            }}
                          >
                            <i className="bi bi-play-fill me-1"></i> Watch Now
                          </Button>
                          <Button
                            variant="outline-light"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAnimeClick(anime.mal_id)
                            }}
                          >
                            <i className="bi bi-info-circle me-1"></i> More Info
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
  
        {/* Top Anime Slider */}
        <section className="top-anime-slider mb-5">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Top Anime</h2>
              <a href="#" className="text-danger text-decoration-none">
                View All <i className="bi bi-chevron-right"></i>
              </a>
            </div>
  
            <Swiper
              slidesPerView={2}
              spaceBetween={16}
              navigation={true}
              breakpoints={{
                576: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
                992: {
                  slidesPerView: 5,
                },
                1200: {
                  slidesPerView: 6,
                },
              }}
              modules={[Navigation, Pagination]}
              className="anime-category-swiper"
              
            >
              {animeData.map((anime) => (
                <SwiperSlide key={`top-${anime.mal_id}`}>
                  <div
                    className="card anime-card border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAnimeClick(anime.mal_id)}
                  >
                    <div className="position-relative">
                      <img
                        src={anime.images.jpg.image_url || "/placeholder.svg"}
                        className="card-img-top"
                        alt={anime.title}
                        style={{ height: "300px", objectFit: "cover" }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <Badge bg="warning" text="dark" className="d-flex align-items-center">
                          <i className="bi bi-star-fill me-1"></i>
                          {anime.score}
                        </Badge>
                      </div>
                      <div className="card-img-overlay d-flex flex-column justify-content-end opacity-0 hover-overlay">
                        <div className="d-grid gap-2">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAnimeClick(anime.mal_id)
                            }}
                          >
                            <i className="bi bi-play-fill"></i> Watch
                          </Button>
                          <Button
                            variant="outline-light"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Add to list functionality
                            }}
                          >
                            <i className="bi bi-plus"></i> Add to List
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-2">
                      <h5 className="card-title text-truncate fs-6">{anime.title_english || anime.title}</h5>
                      <p className="card-text">
                        <small className="text-muted">
                          {anime.episodes || "?"} Ep • {anime.year || "Unknown"}
                        </small>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
  
        {/* Popular This Season */}
        <section className="seasonal-anime-slider mb-5">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Popular This Season</h2>
              <a href="#" className="text-danger text-decoration-none">
                View All <i className="bi bi-chevron-right"></i>
              </a>
            </div>
  
            <Row>
              {animeData.slice(5, 9).map((anime) => (
                <Col key={`seasonal-${anime.mal_id}`} sm={6} md={3} className="mb-4">
                  <div
                    className="card h-100 anime-card border-0"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleAnimeClick(anime.mal_id)}
                  >
                    <div className="position-relative">
                      <img
                        src={anime.images.jpg.image_url || "/placeholder.svg"}
                        className="card-img-top"
                        alt={anime.title}
                        style={{ height: "250px", objectFit: "contain" , backgroundColor: '#68707A'}}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <Badge bg="warning" text="dark" className="d-flex align-items-center">
                          <i className="bi bi-star-fill me-1"></i>
                          {anime.score}
                        </Badge>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{anime.title_english || anime.title}</h5>
                      <p className="card-text small">{truncateText(anime.synopsis, 100)}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">{anime.episodes || "?"} Episodes</small>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleAnimeClick(anime.mal_id)
                          }}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
  
        {/* Popular Anime Slider */}
        <section className="popular-anime-slider mb-5">
          <Container>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="h3 mb-0">Popular Anime</h2>
              <a href="#" className="text-danger text-decoration-none">
                View All <i className="bi bi-chevron-right"></i>
              </a>
            </div>
  
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              autoplay={{ delay: 5000 }}
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2 },
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 },
              }}
              className="anime-swiper"
            >
              {anime.map((item) => (
                <SwiperSlide key={item.mal_id}>
                  <Link to={`/anime/${item.mal_id}`} className="text-decoration-none">
                    <div className="card bg-secondary border-0 h-100 shadow-sm">
                      <img
                        src={item.images.jpg.image_url || "/placeholder.svg"}
                        alt={item.title}
                        className="card-img-top object-fit-cover"
                        style={{ height: 220 }}
                      />
                      <div className="card-body p-2">
                        <h2
                          className="h6 text-white mb-1 overflow-hidden"
                          style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
                        >
                          {item.title}
                        </h2>
                        <p className="mb-0 small text-light">⭐ {item.score ?? "N/A"}</p>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </Container>
        </section>
      </div>
    )
}

export default Carausal;