import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';

import axios from "axios"
import React from 'react';
import {useState, useEffect} from 'react'

const apiKey = "Yhaw6WexncpW6UEMOiwDTI5s5zlVEFQa"


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
      setPrice(stockPrice)
    }
  
    async function checkPrice(ticker){
      return await axios.get("https://api.polygon.io/v2/aggs/ticker/".concat(ticker).concat("/prev?adjusted=true&apiKey=").concat(apiKey))
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
            The current price of {ticker} is {price ? price.data.results[0].c : ""}: 
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