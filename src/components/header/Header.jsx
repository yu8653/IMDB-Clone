import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import IMDBLogo from "./IMDB_Logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((preIsOpen) => !preIsOpen);
  };

  return (
    <nav className={`nav ${isOpen ? "open" : ""}`}>
      <Link to="/" className="nav-logo">
        <img className="nav-icon" src={IMDBLogo} alt="IMDB Logo" />
      </Link>
      <Link to="/movies/popular/1">Popular</Link>
      <Link to="/movies/top_rated/1">Top Rated</Link>
      <Link to="/movies/upcoming/1">Upcoming</Link>
      <a href="#" className="icon" onClick={handleClick}>
        <i className="fa fa-bars"></i>
      </a>
    </nav>
  );
};

export default Header;
