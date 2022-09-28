import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";

const Card = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  const cardRef = useRef();

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      setIsLoading(false);
    }
  });

  useEffect(() => {
    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="card" ref={cardRef}>
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} className="card-link">
          <div className="card">
            <img
              loading="lazy"
              className="card-img"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
            />
            <div className="card-overlay">
              <div className="card-title">
                {movie ? movie.original_title : ""}
              </div>
              <div className="card-runtime">
                {movie ? movie.release_date : ""}
                <span className="card-rating">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star" />
                </span>
              </div>
              <div className="card-description">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
