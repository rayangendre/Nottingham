import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"
import './App.css';
import {Buy, Sell} from './buysell.js'
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from "react-bootstrap/Row"
import { Component } from 'react';
import ApiTest from './ApiTest';
import React from 'react';




function App() {

  const [value, setValue] = React.useState("Api not called");
  return (
    <div className="App">
      <h1 class="p-3 mb-2 bg-dark text-white">NOTTINGHAM</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="login" element={<LogIn />} />
        <Route path="buy" element={<Buy />}/>
        <Route path="sell" element={<Sell />}/>
      </Routes>
      <div>
        <button onClick={(setValue) => ApiTester()}>
            Call ApiTest
        </button>
        <label>{value.apiResponse}</label>

      </div>
    </div>
  );
}

function ApiTester(setValue){
  console.log("calling api")
  fetch("http://localhost:4000/api/users")
          .then(res => res.text())
          .then(res => setValue({ apiResponse: res }));
  setValue({apiResponse: "value"});
  
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
      </Container>
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


export default App;
