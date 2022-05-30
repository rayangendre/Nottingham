import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';

import axios from "axios"
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
import {Buy, Sell} from './buysell.js'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from "react-bootstrap/Row"
import { Component } from 'react';
import ApiTest from './ApiTest';
import React from 'react';
import {useState, useEffect} from 'react'
import BasicTable from './Table.js';
import { WatchlistTable } from "./Table.js";
import { LogIn } from "./Login.js"
import {Watchlist} from "./WatchList.js"
import {StockCheck} from "./StockCheck.js"
import {Portfolio} from "./Portfolio.js"
import Header from './Header';

const apiKey = "Yhaw6WexncpW6UEMOiwDTI5s5zlVEFQa"


function App() {

  const [userId, setUserId] = useState("")
  const [data, setData] = React.useState({});


  return (
    <div className="App">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 class="p-3 mb-2 bg-dark text-white">NOTTINGHAM</h1>
      </Link>
      <Routes>
        <Route path='/:page' component={Header} />
        <Route path ='/' component={Header}/>

        <Route path="/" element={<Home userId = {userId}/>} />
        <Route path="/home" element={<Home userId = {userId}/>} />
        <Route path="portfolio" element={<Portfolio userId = {userId}/>} />
        <Route path="watchlist" element={<Watchlist userId = {userId}/>} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route path="login" element={<LogIn userId = {userId} setUserId = {setUserId} />} />
        <Route path="buy" element={<Buy userId = {userId}/>}/>
        <Route path="sell" element={<Sell userId = {userId}/>}/>
      </Routes>
      <div>
        
      </div>
    </div>
  );
}

function Home(props) {

  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>The leader in stock portfolios</p>
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
      </nav>
      <div>
        {props.userId ? props.userId : "Not logged in"}
      </div>
    </div>
  );
}




export default App;