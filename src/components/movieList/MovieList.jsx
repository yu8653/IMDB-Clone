import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../card/Card";
import "./movieList.css";

const MovieList = ({ isFrontPage = false }) => {
  const [movieList, setMovieList] = useState([]);
  const { type, page = 1 } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const fetchData = async () => {
    try {
      const res = await axios(
        `https://api.themoviedb.org/3/movie/${type ?? "popular"}`,
        {
          method: "GET",
          params: {
            api_key: "ceacd0ea7a0e41c173327b6f1cf5a096",
            language: "en-US",
            page: Number(page),
          },
        }
      );
      const data = res.data;
      setMovieList(data.results);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="movie-list">
      <h2 className="list-title">{(type ? type : "Popular").toUpperCase()}</h2>
      <div className="list-cards">
        {movieList.map((movie) => {
          return <Card key={movie.id} movie={movie} />;
        })}
      </div>
      {!isFrontPage && (
        <div className="pagenation">
          <Link
            type="button"
            disabled={page === "1"}
            to={`/movies/${type}/${Number(page) - 1}`}
          >
            Previous
          </Link>
          <Link type="button" to={`/movies/${type}/${Number(page) + 1}`}>
            Next
          </Link>
        </div>
      )}
    </div>
  );
};

export default MovieList;
