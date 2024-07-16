import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./NavBar.css";

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/home">Home</Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : null}
      </ul>
      {user && (
        <div className="user-info">
          <span>{user.usernameOrEmail}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
