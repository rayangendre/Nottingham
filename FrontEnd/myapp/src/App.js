import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Table.js";
import "./index.css";
import StockChart from "./StockChart.js";
import Navbar from "./Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

require("dotenv").config();

function App() {
  const tickers = [
    "SPY",
    "AAPL",
    "TSLA",
    "GOOGL",
    "NKE",
    "AMZN",
    "QQQ",
    "CRM",
    "SHOP",
    "MSFT",
    "PYPL",
    "TTD",
    "TWLO",
  ];
  const ticker = tickers[Math.floor(Math.random() * 6)];
  return (
    <div class="center">
      <Navbar />
      <h2>WELCOME TO NOTTINGHAM</h2>
      <p1 class="lower-header">
        We are the leaders in stock trading here at Nottingham
      </p1>
      <p>Let us help you reach financial freedom</p>
      <h4>Featured Stock</h4>
      <h2>{ticker}</h2>
      <StockChart symbol={ticker}></StockChart>
    </div>
  );
}

export default App;
