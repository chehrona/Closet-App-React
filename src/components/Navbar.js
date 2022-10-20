import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./css/Navbar.css"

const Navbar = () => {
  return (
    <>
      <nav className="navbar-box">
        <ul>
          <li>
            <Link className="nav--link" to="/">HOME</Link>
          </li>
          <li>
            <Link className="nav--link" to="/closet">CLOSET</Link>
          </li>
          <li>
            <Link className="nav--link" to="/looks">LOOKS</Link>
          </li>
          <li className="last-nav-item">
            <Link className="nav--link" to="/calendar">CALENDAR</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Navbar;