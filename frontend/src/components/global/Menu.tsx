import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  const authLinks = [
   {
    name: "Login",
    path: "/login"
   },
   {
    name: "Register",
    path: "/register"
   },
  ];

  return (
   <ul className="navbar-nav ms-auto">
    {authLinks.map((link, index) => {
     return (
      <li className="nav-item active" key={index}>
        <Link className="nav-link" to={link.path}>{link.name}</Link>
      </li>
     );          
    })}
    <li className="nav-item dropdown">
      <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Username
      </span>
      <div className="dropdown-menu">
        <Link className="dropdown-item" to="/profile">Profile</Link>
        <div className="dropdown-divider"></div>
        <Link className="dropdown-item" to="/">Logout</Link>
      </div>
    </li>
   </ul>
  );
}

export default Menu;