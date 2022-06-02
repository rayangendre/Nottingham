import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "./App.css";
import "./Table.js";
import "./Stock.js";

import axios from "axios";
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';

import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

import React from "react";
import { useState, useEffect } from "react";

import BasicTable from "./Table.js";

function createData(name, shares, totalValue, price, percent_change) {
  return { name, shares, totalValue, price, percent_change };
}

function Portfolio(props) {
  const [portList, setPortList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAPI(props) {
      if (!props.userId) {
        navigate("/login", { replace: true });
        window.alert("Please login to view your portfolio!");
        return;
      }
      let response = await fetch(
        process.env.REACT_APP_BACKEND_URL.concat("users/").concat(props.userId)
      ).then((res) => res.json());
      let portfolList = [];
      for (var i = 0; i < response.users_list.portfolioList.length; i++) {
        //this line here is adding the actual name, number of shares, and total price to the table
        //Make the api call here to alpha advantage
        const price = await getPriceFromTicker(
          response.users_list.portfolioList[i].name
        ); //5 API calls per minute, can be a limiter

        let previous_price = response.users_list.purchase_history;
        console.log("Purchase History ", response.users_list.purchase_history);
        let percent_change = 0;
        if (previous_price === undefined) {
          percent_change = 0;
        } else {
          let indexForPreviousPrice = previous_price.findIndex((item) => {
            return item.ticker === response.users_list.portfolioList[i].name;
          });
          if (indexForPreviousPrice !== -1) {
            previous_price = previous_price[indexForPreviousPrice].price;
            percent_change = ((price - previous_price) / previous_price) * 100;
          }
        }
        console.log("percent change ", percent_change);

        portfolList.push(
          createData(
            response.users_list.portfolioList[i].name,
            response.users_list.portfolioList[i].numShares,
            response.users_list.portfolioList[i].numShares * price,
            price,
            percent_change
          )
        );
      }
      setPortList(portfolList);
    }
    fetchAPI(props);
  }, []);

  async function checkPrice(ticker) {
    return await axios.get(
      "https://finnhub.io/api/v1/quote?symbol="
        .concat(ticker)
        .concat("&token=")
        .concat(process.env.REACT_APP_FINHUB_API_KEY)
    );
    // return await axios.get("https://api.polygon.io/v2/aggs/ticker/".concat(ticker).concat("/prev?adjusted=true&apiKey=").concat(apiKey))
  }

  async function getPriceFromTicker(ticker) {
    const stockPrice = await checkPrice(ticker.toUpperCase());
    console.log(stockPrice);
    // const timeSeriesObject = stockPrice["data"]["Time Series (1min)"]
    //extract the first key from the JSON, corresponds to the latest minute of data returned
    // const firstKey = Object.keys(timeSeriesObject)[0]

    return parseFloat(stockPrice["data"]["c"]);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Col></Col>
            <nav>
              <Link to="/buy">
                <button type="submit" className="btn btn-primary w-25">
                  Buy
                </button>
              </Link>
              <Link to="/sell">
                <button type="submit" className="btn btn-primary w-25">
                  Sell
                </button>
              </Link>
            </nav>
          </Col>
          <Col>
            <h2>Portfolio</h2>
          </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        <p>Here all your stocks are listed out</p>
        {BasicTable(portList)}
      </Container>
    </>
  );
}

export { Portfolio };
