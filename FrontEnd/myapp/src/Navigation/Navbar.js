import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "../App.css";
import "../Table.js";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';

import { Buy, Sell } from "../buysell.js";

import { useState } from "react";

import { LogIn } from "../Login.js";
import { SignUp } from "../SignUp.js";
import { Watchlist } from "../WatchList.js";
import { StockCheck } from "../StockCheck.js";
import { Portfolio } from "../Portfolio.js";
import { useCookies } from "react-cookie";
import { Dynamic } from "../Dynamic.js";
import { LogOut } from "../logout.js";

import { useEffect } from "react";
import axios from "axios";
require("dotenv").config();
const Navbar = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [cookies, setCookie] = useCookies(["auth_token"]);
  const [ticker] = useState("");

  //sets the auth token of the user
  function setToken(token) {
    setCookie("auth_token", token, {
      path: "/",
    });
  }

  useEffect(() => {
    fetchAll().then((result) => {
      if (result) {
        console.log(result._id);
        setId(result._id);
        setName(result.name);
      }
    });
  }, [cookies]);

  async function fetchAll() {
    try {
      const config = {
        headers: { Authorization: "Bearer ".concat(cookies.auth_token) },
      };

      const response = await axios.get("http://localhost:4000/users", config);
      console.log(response);
      console.log(response.data.users_list);
      return response.data.users_list;
    } catch (error) {
      // We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  //sets the id of the current user that is logged in
  function setId(userId) {
    setUserId(userId);
  }

  function setName(userName) {
    setUserName(userName);
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          NOTTINGHAM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/portfolio" className="nav-link">
                Portfolio
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/watchlist" className="nav-link">
                Watchlist
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/stockcheck" className="nav-link">
                StockCheck
              </Link>
            </li>
          </ul>
        </div>
        <div class="navbar navbar-expand-lg navbar-light bg-light text-right">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={userName ? "/logout" : "/login"} className="nav-link">
                {userName ? userName : "Login"}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" />
        <Route path="portfolio" element={<Portfolio userId={userId} />} />
        <Route path="watchlist" element={<Watchlist userId={userId} />} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route
          path="login"
          element={
            <LogIn
              userId={userId}
              setId={setId}
              setName={setName}
              setToken={setToken}
            />
          }
        />
        <Route
          path="logout"
          element={<LogOut userId={userId} userName={userName} />}
        />
        <Route
          path="signup"
          element={<SignUp userId={userId} setId={setId} setName={setName} />}
        />
        <Route path="buy" element={<Buy userId={userId} />} />
        <Route path="sell" element={<Sell userId={userId} />} />
        <Route path="/dynamic/:ticker" element={<Dynamic ticker={ticker} />} />
      </Routes>
      <div></div>
    </div>
  );
};

export default Navbar;
