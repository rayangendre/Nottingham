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
      const stockPrice = await checkPrice(e.target.ticker.value.toUpperCase())
      console.log(stockPrice)
      setTicker(e.target.ticker.value.toUpperCase())
      const lastCheckTime = stockPrice["data"]["Meta Data"]["Last Refreshed"]
      setPrice(stockPrice["data"]["Time Series (1min)"][lastCheckTime]["4. close"])
    }
  
    async function checkPrice(ticker){
      return await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".concat(ticker).concat("&interval=1min&apikey=").concat(apiKey));
      // return await axios.get("https://api.polygon.io/v2/aggs/ticker/".concat(ticker).concat("/prev?adjusted=true&apiKey=").concat(apiKey))
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
            The current price of {ticker} is {price ? price : ""}: 
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