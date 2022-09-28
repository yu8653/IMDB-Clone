import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import MovieList from "../../components/movieList/MovieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  const API_KEY = "ceacd0ea7a0e41c173327b6f1cf5a096";
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/movie/popular`, {
      method: "GET",
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    })
      .then((res) => res.data)
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              key={movie.id}
              className="carousel-item"
              to={`/movie/${movie.id}`}
            >
              <div className="movie-image">
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                />
              </div>
              <div className="overlay">
                <div className="movie-title">
                  {movie ? movie.original_title : ""}
                </div>
                <div className="movie-runtime">
                  {movie ? movie.release_date : ""}
                  <span className="movie-rating">
                    {movie ? movie.vote_average : ""}
                    <i className="fas fa-star" />{" "}
                  </span>
                </div>
                <div className="movie-description">
                  {movie?.overview?.length > 100
                    ? `${movie?.overview.slice(0, 50)}...`
                    : movie?.overview}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList isFrontPage={true} />
      </div>
    </>
  );
};

export default Home;
