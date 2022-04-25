import { Routes, Route, Link } from "react-router-dom";
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
import { useParams } from "react-router-dom";

import BasicTable from "./Table.js";
import Stock from "./Stock.js";

function Dynamic(props) {
  const { ticker } = useParams();
  return (
    <div>
      <h1>{ticker}</h1>
      <Stock symbol={ticker} />
    </div>
  );
}

export { Dynamic };
