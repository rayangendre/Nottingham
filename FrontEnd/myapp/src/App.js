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
  const ticker = "SPY";
  return (
    <div>
      <Navbar />
      <StockChart symbol={ticker}></StockChart>
    </div>
  );
}

export default App;
