import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';
import './Stock.js';

import axios from "axios"
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from "react-bootstrap/Row"

import React from 'react';
import {useState, useEffect} from 'react'

import BasicTable from './Table.js';
import Stock from "./Stock.js";

const apiKey = "RZEXR5SFIKLQNKYK"

function createData(name, shares, price)
{
    return {name, shares, price}
}

function Portfolio(props) {

    const [portList, setPortList] = useState([]);
    useEffect(() => {
      async function fetchAPI(props){
        let response = await fetch("http://localhost:4000/users/".concat(props.userId)).then(res => res.json())
        let portfolList = []
        for(var i = 0; i < response.users_list.portfolioList.length; i++){
          //this line here is adding the actual name, number of shares, and total price to the table
          //Make the api call here to alpha advantage
          const price = await getPriceFromTicker(response.users_list.portfolioList[i].name); //5 API calls per minute, can be a limiter
          portfolList.push(createData(response.users_list.portfolioList[i].name, response.users_list.portfolioList[i].numShares, price));
        }
        setPortList(portfolList)
      }
      fetchAPI(props)
    }, [])

    async function checkPrice(ticker){
      return await axios.get("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=".concat(ticker).concat("&interval=1min&apikey=").concat(apiKey));
      // return await axios.get("https://api.polygon.io/v2/aggs/ticker/".concat(ticker).concat("/prev?adjusted=true&apiKey=").concat(apiKey))
    }

    async function getPriceFromTicker(ticker){
      const stockPrice = await checkPrice(ticker.toUpperCase())
      const timeSeriesObject = stockPrice["data"]["Time Series (1min)"]
      //extract the first key from the JSON, corresponds to the latest minute of data returned
      const firstKey = Object.keys(timeSeriesObject)[0]

      return parseFloat(stockPrice["data"]["Time Series (1min)"][firstKey]["4. close"]);
    }
    


    
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
          {BasicTable(portList)}
        </Container>
        <Stock></Stock>
      </>
    );
  }

  export {Portfolio};
  