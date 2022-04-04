import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';

import axios from "axios"
import React from 'react';
import {useState, useEffect} from 'react'

const apiKey = "RZEXR5SFIKLQNKYK"


function StockCheck(){
    let myvalue, myquery;
    const [price, setPrice] = useState(null)
    const [ticker, setTicker] = useState("")
  
    async function HandleSubmit(e){
      console.log(e.target.ticker.value)
      e.preventDefault()
      setTicker(e.target.ticker.value.toUpperCase())
      //calls the API using the stock ticker
      const stockPrice = await checkPrice(e.target.ticker.value.toUpperCase())
      //the object that is extracted from the API response, since it is not a list we must do extra processing
      const timeSeriesObject = stockPrice["data"]["Time Series (1min)"]
      //extract the first key from the JSON, corresponds to the latest minute of data returned
      const firstKey = Object.keys(timeSeriesObject)[0]
      //set the price of the stock using the key we extracted and take the closing price
      setPrice(stockPrice["data"]["Time Series (1min)"][firstKey]["4. close"])
      // console.log(firstKey)
      // console.log(stockPrice["data"]["Time Series (1min)"][firstKey]["4. close"])
    }
  
    async function checkPrice(ticker){
      return await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".concat(ticker).concat("&interval=1min&apikey=").concat(apiKey));
    }
  
    return (
      <>
        <main>
          <h2>StockCheck</h2>
          <form onSubmit={HandleSubmit}>
            <div class="mb-3">
              <label class="form-label">Ticker</label>
              <input name="ticker" type="text" class="form-control" placeholder="Enter a ticker..."/>
              <button type="submit" class="btn btn-outline-primary" >Check Price</button>
            </div>
          </form>
          <p>
            The current price of {ticker} is: {price ? price : ""} 
          </p>
        
        </main>
        <nav>
          <Link to="/">
            <button type="button" class="btn btn-outline-primary">
              Home
            </button>
          </Link>
        </nav>
        <div id='root' />
      </>
    );
  }

  export {StockCheck};