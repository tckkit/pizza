import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutNowThunk, loginFailureAction } from "../../Redux/auth/actions";

export default function Navbar() {
  const dispatch = useDispatch();
  let authRole = useSelector((state) => state.authStore.authRole);

  const accountFname = localStorage.getItem("accountFname");
  const accountLname = localStorage.getItem("accountLname");

  return (
    <>
      <div className="text-center">
        <div
          data-animation="default"
          data-collapse="medium"
          data-duration="400"
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar w-nav"
        >
          <div className="navnavBar">
            <div className="logoAndTitle">
              <Link to="/menu">
                <img
                  src={`pizza/pizzaHutLogo3.png`}
                  loading="lazy"
                  sizes="150px"
                  alt=""
                  className="image-2"
                />
              </Link>
            </div>

            <nav role="navigation" className="nav-menu w-nav-menu">
              {authRole == "campus" ? (
                <Link to="/edit-promo" className="w-nav-link">
                  <b className="editItemButton">Edit promo</b>
                </Link>
              ) : null}

              {authRole == "campus" ? (
                <Link to="/edit-pizza" className="w-nav-link">
                  <b className="editItemButton">Edit item</b>
                </Link>
              ) : null}

              {authRole == "family" ? (
                <Link to="/menu" className="w-nav-link">
                  {`${accountFname.toUpperCase()} ${accountLname.toUpperCase()}`}
                </Link>
              ) : null}

              {authRole == "family" ? (
                <Link to="/myaccount" className="w-nav-link">
                  My order
                </Link>
              ) : null}

              {!authRole ? (
                <Link
                  to="/login"
                  className="w-nav-link"
                  onClick={() => dispatch(loginFailureAction())}
                >
                  Login
                </Link>
              ) : null}

              {!authRole ? (
                <Link
                  to="/signup"
                  className="w-nav-link"
                  onClick={() => dispatch(loginFailureAction())}
                >
                  Register
                </Link>
              ) : null}

              {authRole ? (
                <span
                  onClick={() => dispatch(logoutNowThunk())}
                  className="w-nav-link logout-btn"
                >
                  Logout
                </span>
              ) : null}
            </nav>

            <div className="menu-button w-nav-button">
              <div className="icon w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
