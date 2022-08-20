import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../redux/actions/authAction';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStore } from '../../utils/tsDefs';

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

  const appLinks = [
   {
    name: "Home",
    path: "/"
   },
   {
    name: "Create Blog",
    path: "/create_blog"
   },
  ];

  const { auth } = useAppSelector((state: RootStore) => state);

  const navLinks = auth.access_token ? appLinks : authLinks;

  const { pathname } = useLocation();

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
  }

  const dispatch = useAppDispatch();

  return (
   <ul className="navbar-nav ms-auto">
    {navLinks.map((link, index) => {
     return (
      <li className={`nav-item active ${isActive(link.path)}`} key={index}>
        <Link className="nav-link" to={link.path}>{link.name}</Link>
      </li>
     );          
    })}
    {auth.user &&     
      <li className="nav-item dropdown">
        <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={auth.user.avatar} alt="Avatar" className='avatar' />
        </span>
        <div className="dropdown-menu">
          <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>Profile</Link>
          <div className="dropdown-divider"></div>
          <Link className="dropdown-item" to="/" onClick={() => dispatch(logout())}>Logout</Link>
        </div>
      </li>
    }
   </ul>
  );
}

export default Menu;