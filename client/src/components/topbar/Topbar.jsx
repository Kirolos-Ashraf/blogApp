import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = 'http://localhost:5000/images/'

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="top-bar">
        <div className="top-left">
          <ul className="top-list">
            <li className="top-listItem">
              <i className="top-icon bi bi-facebook"></i>
            </li>
            <li className="top-listItem">
              <i className="top-icon bi bi-instagram"></i>
            </li>
            <li className="top-listItem">
              <i className="top-icon bi bi-twitter"></i>
            </li>
            <li className="top-listItem">
              <i className="top-icon bi bi-pinterest"></i>
            </li>
          </ul>
        </div>
        <div className="top-center">
          <ul className="top-list">
            <li className="top-listItem">
              <Link className="link" to="/">
                HOME
              </Link>
            </li>
            <li className="top-listItem">
              <Link className="link" to="/">
                ABOUT
              </Link>
            </li>
            <li className="top-listItem">
              <Link className="link" to="/">
                CONTACT
              </Link>
            </li>
            <li className="top-listItem">
              <Link className="link" to="/write">
                WRITE
              </Link>
            </li>
            <li className="top-listItem" onClick={handleLogout}>
              {user && "LOGOUT"}
            </li>
          </ul>
        </div>
        <div className="top-right">
          {user ? (
            <Link to={"/settings"}>
              <img className="top-img" src={ PF +user.profilePic} alt="" />
            </Link>
          ) : (
            <ul className="top-list">
              <li className="top-listItem">
                <Link className="link" to="/login">
                  LOGIN
                </Link>
              </li>
              <li className="top-listItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>
            </ul>
          )}

          <i className="right-icon bi bi-search"></i>
        </div>
      </div>
    </>
  );
}
