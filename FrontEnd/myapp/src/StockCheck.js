import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "./App.css";
import "./Table.js";
import { currencyFormat } from "./Table.js";

import axios from "axios";
import React from "react";
import { useState } from "react";

function StockCheck() {
  const [message, setMessage] = useState("");

  async function HandleSubmit(e) {
    console.log(e.target.ticker.value);
    e.preventDefault();
    const ticker = e.target.ticker.value.toUpperCase();

    //calls the API using the stock ticker
    const stockPrice = await checkPrice(ticker);

    const message = "The value of "
      .concat(ticker)
      .concat(" is ")
      .concat(currencyFormat(stockPrice));
    setMessage(message);
  }

  async function checkPrice(ticker) {
    const stockPrice = await axios.get(
      "https://finnhub.io/api/v1/quote?symbol="
        .concat(ticker)
        .concat("&token=")
        .concat(process.env.REACT_APP_FINHUB_API_KEY)
    );
    return parseFloat(stockPrice["data"]["c"]);
  }

  return (
    <>
      <main>
        <h2>StockCheck</h2>
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label className="form-label">Ticker</label>
            <input
              name="ticker"
              type="text"
              className="form-control"
              placeholder="Enter a ticker..."
            />
            <button type="submit" className="btn btn-outline-primary">
              Check Price
            </button>
          </div>
        </form>
        <p>{message}</p>
      </main>
      <div id="root" />
    </>
  );
}

export { StockCheck };
