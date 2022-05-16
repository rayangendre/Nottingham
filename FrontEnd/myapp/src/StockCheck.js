import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "./App.css";
import "./Table.js";
import { currencyFormat } from "./Table.js";

import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

function StockCheck() {
  let myvalue, myquery;
  const [message, setMessage] = useState("");

  async function HandleSubmit(e) {
    console.log(e.target.ticker.value);
    e.preventDefault();
    const ticker = e.target.ticker.value.toUpperCase();
    //console.log("Ticker: ", ticker)
    //calls the API using the stock ticker
    const stockPrice = await checkPrice(ticker);
    //console.log("Price: ", stockPrice)
    //the object that is extracted from the API response, since it is not a list we must do extra processing
    //const timeSeriesObject = stockPrice["data"]["Time Series (1min)"];
    //extract the first key from the JSON, corresponds to the latest minute of data returned
    //const firstKey = Object.keys(timeSeriesObject)[0];
    //set the price of the stock using the key we extracted and take the closing price
    const message = "The value of "
      .concat(ticker)
      .concat(" is ")
      .concat(currencyFormat(stockPrice));
    setMessage(message);
    //console.log("Message: ", message);
    // console.log(firstKey)
    // console.log(stockPrice["data"]["Time Series (1min)"][firstKey]["4. close"])
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
          <div class="mb-3">
            <label class="form-label">Ticker</label>
            <input
              name="ticker"
              type="text"
              class="form-control"
              placeholder="Enter a ticker..."
            />
            <button type="submit" class="btn btn-outline-primary">
              Check Price
            </button>
          </div>
        </form>
        <p>{message}</p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
      <div id="root" />
    </>
  );
}

export { StockCheck };
