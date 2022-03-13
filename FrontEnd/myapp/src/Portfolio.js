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

import BasicTable from './Table.js';

function createData(name, shares, price)
{
    return {name, shares, price}
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

  export {Portfolio};
  