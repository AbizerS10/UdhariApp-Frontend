import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../Css/navbar.css";

function Navbar() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/";
    } catch (error) {
      // window.location.href = "/";
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              alt=""
              width="50"
              height="50"
            />
          </a>
          {isLogged ? (
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {user.shopname}
              </button>
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="nav_right">
              <Link to="/login" className="login me-3">
                Login
              </Link>
              <Link to="/signup" className="sup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
