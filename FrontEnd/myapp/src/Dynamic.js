import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Table.js";
import "./Stock.js";

import React from "react";
import { useParams } from "react-router-dom";

import Stock from "./Stock.js";

function Dynamic(props) {
  const { ticker } = useParams();
  return (
    <div>
      <h1>{ticker}</h1>
      <Stock symbol={ticker} />
    </div>
  );
}

export { Dynamic };
