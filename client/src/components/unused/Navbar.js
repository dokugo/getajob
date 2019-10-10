import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="home-link">
        Home
      </Link>
    </div>
  );
};

export default Navbar;
