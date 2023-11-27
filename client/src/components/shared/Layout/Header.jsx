import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  //   LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toastify.success("Logout Succesfully!");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link to="/" className="main-logo-redirect">
              <BiDonateBlood color="red" />
              &nbsp;Blood Bank App
            </Link>
          </div>
          <ul className="navbar-nav  flex-row">
            <li className="nav-item mx-2">
              <p className="nav-link">
                <BiUserCircle className="user-logo" /> Welcome,{" "}
                {user?.name ||
                  user?.hospitalName ||
                  user?.organisationName ||
                  "friend"}{" "}
                &nbsp;
                <span className="badge bg-secondary user-role mx-1">
                  {user?.role}
                </span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-2">
                <Link to="/analytics" className="nav-link">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-2">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button
                className="btn btn-danger logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
