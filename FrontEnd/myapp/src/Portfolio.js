import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';

import axios from "axios"
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';

import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from "react-bootstrap/Row"

import React from 'react';
import {useState, useEffect} from 'react'

import BasicTable from './Table.js';

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
          portfolList.push(createData(response.users_list.portfolioList[i].name, response.users_list.portfolioList[i].numShares, 100))
        }
        setPortList(portfolList)
      }
      fetchAPI(props)
    }, [])
    
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
      </>
    );
  }

  export {Portfolio};
  