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


const apiKey = "Yhaw6WexncpW6UEMOiwDTI5s5zlVEFQa"

function createData(name, shares, price)
{
    return {name, shares, price}
}

function App() {

<<<<<<< HEAD
  const [userId, setUserId] = useState("")
=======
  const [data, setData] = React.useState({});
>>>>>>> 32162ae (modifying backend and added tables)


  return (
    <div className="App">
      <h1 class="p-3 mb-2 bg-dark text-white">NOTTINGHAM</h1>
      <Routes>
        <Route path="/" element={<Home userId = {userId}/>} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route path="login" element={<LogIn userId = {userId} setUserId = {setUserId} />} />
        <Route path="buy" element={<Buy />}/>
        <Route path="sell" element={<Sell />}/>
      </Routes>
<<<<<<< HEAD
=======
      <div>
        {name}
      </div>
>>>>>>> 32162ae (modifying backend and added tables)
    </div>
  );
}

<<<<<<< HEAD


// function ApiTester(setValue){
//   console.log("calling api")
//   fetch("http://localhost:4000/api/users")
//           .then(res => res.text())
//           .then(res => setValue({ apiResponse: res }));
//   setValue({apiResponse: "value"});
  
// }

function Home(props) {
=======
function Home() {
>>>>>>> 32162ae (modifying backend and added tables)
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
      <div>
        {props.userId ? props.userId : "Not logged in"}
      </div>
    </div>
  );
}

function Portfolio() {

  const [testData, setTestData] = React.useState([
    createData("APPLE", 123, 156.5), 
    createData("TESLA", 43, 1156.0), 
    createData("GOOGLE", 15, 1456.41), 
    createData("BITCOIN", 345, 15.412345), 
    createData("EPIC GAMES", 13, 74.98), 
  ]);
  
  return (
    <>
      <Container>
        <Row>
            
              <Col>
                 <nav>
                <Link to="/">
                  <button type="submit" class="btn btn-primary w-25">
                    Home
                  </button>
                </Link>
                <Link to="/buy">
                  <button type="submit" class="btn btn-primary w-25">
                    Buy
                  </button>
                </Link>
                <Link to="/sell">
                  <button type="submit" class="btn btn-primary w-25">
                    Sell
                  </button>
                </Link>
                </nav>
              </Col>
              <Col>
              <h2>Portfolio</h2>
              </Col>
              <Col>
              </Col>
            
        </Row>
      </Container>
      <Container>
        
        <p>
          Here all your stocks are listed out
        </p>
        {BasicTable(testData)}
      </Container>
    </>
  );
}

function Watchlist() {

<<<<<<< HEAD
async function HandleSubmit(){

}
=======
  const [testData, setTestData] = React.useState([
    createData("APPLE", 123, 156.5), 
    createData("TESLA", 43, 1156.0), 
    createData("GOOGLE", 15, 1456.41), 
    createData("BITCOIN", 345, 15.412345), 
    createData("EPIC GAMES", 13, 74.98), 
  ]);

>>>>>>> 32162ae (modifying backend and added tables)

  return (
    <>
      <main>
        <h2>Watchlist</h2>
        <p>
          Here you can track the stocks that you are currently interested in
        </p>
        <form onSubmit={HandleSubmit}>
          <div class="mb-3">
            <label class="form-label">Add a stock to your watchlist</label>
            <input name="watch" type="text" class="form-control" placeholder="Enter a stock ticker..."/>
            <button type="submit" class="btn btn-outline-primary" >Add To Watchlist</button>
          </div>
        </form>
      </main>
      
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
      {BasicTable(testData)}
    </>
  );
}

function LogIn(props) {

  const [userData, setUserData] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
      setUserData(data)
      //console.log(data)
    })
  }, [])

  async function HandleSubmit(e){
    const login = e.target.login.value
    //console.log(login)
    e.preventDefault()
    let newId
    if (newId = userExists(login)) {
      console.log("User exists")
      console.log(newId)
    } else {
      console.log("User does not exist...Creating user...")
      newId = await createUser(login)
      console.log("New user made... ID:".concat(newId))
    }
    props.setUserId(newId)
  }

  async function createUser(username){
    const result = await axios.post("http://localhost:4000/api/users", {"name": username})
    return result.data._id
  }

   function userExists(user) {
    //console.log(userData)
    for (let i = 0; i < userData.length; i++) {
      //console.log(userData[i])
      if (userData[i].name == user) {
        return userData[i]._id
      }
    }
    return null
  }

  return (
    <>
      <main>
        <h2>Log In</h2>
        <p>
          Log in to access your personalized portfolio, and buy/sell stocks
        </p>
        <form onSubmit={HandleSubmit}>
          <div class="mb-3">
            <label class="form-label">Log In to your account</label>
            <input name="login" type="text" class="form-control" placeholder="Enter your name..."/>
            <button type="submit" class="btn btn-outline-primary" >Log In</button>
          </div>
        </form>
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

export default App;