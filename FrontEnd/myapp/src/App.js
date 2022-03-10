import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"
import './App.css';
import axios from "axios"
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
import { useState } from 'react';
const apiKey = "Yhaw6WexncpW6UEMOiwDTI5s5zlVEFQa"

function App() {
  return (
    <div className="App">
      <h1>Welcome to Nottingham!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

function Home() {
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
      </nav>
    </div>
  );
}

function Portfolio() {
  return (
    <>
      <main>
        <h2>Portfolio</h2>
        <p>
          Here all your stocks are listed out
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function Watchlist() {
  return (
    <>
      <main>
        <h2>Watchlist</h2>
        <p>
          Here you can track the stocks that you are currently interested in
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function LogIn() {
  return (
    <>
      <main>
        <h2>Log In</h2>
        <p>
          Log in to access your personalized portfolio, and buy/sell stocks
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function StockCheck(){
  let myvalue, myquery;
  const [price, setPrice] = useState(null)
  const [ticker, setTicker] = useState("")

  async function HandleSubmit(e){
    console.log(e.target.ticker.value)
    e.preventDefault()
    const stockPrice = await checkPrice(e.target.ticker.value)
    console.log(stockPrice)
    setTicker(e.target.ticker.value)
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
            <input name="ticker" type="text" class="form-control"/>
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

export default App;