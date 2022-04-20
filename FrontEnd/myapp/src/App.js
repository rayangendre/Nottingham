import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "./App.css";
import "./Table.js";

//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';

import { Buy, Sell } from "./buysell.js";

import React from "react";
import { useState } from "react";

import { LogIn } from "./Login.js";
import { SignUp } from "./SignUp.js";
import { Watchlist } from "./WatchList.js";
import { StockCheck } from "./StockCheck.js";
import { Portfolio } from "./Portfolio.js";
import { useCookies } from "react-cookie";
import { Dynamic } from "./Dynamic.js";

const apiKey = "Yhaw6WexncpW6UEMOiwDTI5s5zlVEFQa";

function App() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [data, setData] = React.useState({});
  const [cookies, setCookie] = useCookies(["auth_token"]);

  //sets the auth token of the user
  function setToken(token) {
    setCookie("auth_token", token, {
      path: "/",
    });
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
      <h1 class="p-3 mb-2 bg-dark text-white">NOTTINGHAM</h1>
      <Routes>
        <Route
          path="/"
          element={<Home userId={userId} userName={userName} />}
        />
        <Route path="portfolio" element={<Portfolio userId={userId} />} />
        <Route path="watchlist" element={<Watchlist userId={userId} />} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route
          path="login"
          element={<LogIn userId={userId} setId={setId} setName={setName} />}
        />
        <Route
          path="signup"
          element={<SignUp userId={userId} setId={setId} setName={setName} />}
        />
        <Route path="buy" element={<Buy userId={userId} />} />
        <Route path="sell" element={<Sell userId={userId} />} />
        <Route path="dynamic" element={<Dynamic />} />} />
      </Routes>
      <div></div>
    </div>
  );
}

function Home(props) {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>The leader in stock portfolio</p>
      </main>
      <nav>
        <Link to="/portfolio">
          <button type="button" class="btn btn-outline-primary">
            Portfolio
          </button>
        </Link>
        <Link to="/watchlist">
          <button type="button" class="btn btn-outline-primary">
            Watchlist
          </button>
        </Link>
        <Link to="/stockcheck">
          <button type="button" class="btn btn-outline-primary">
            StockCheck
          </button>
        </Link>
        <Link to="/login">
          <button type="button" class="btn btn-outline-primary">
            Log In
          </button>
        </Link>
        <Link to="/signup">
          <button type="button" class="btn btn-outline-primary">
            Sign Up
          </button>
        </Link>
      </nav>
      <div>
        {props.userName
          ? "Logged in as ".concat(props.userName)
          : "Not logged in"}
      </div>
    </div>
  );
}

export default App;
