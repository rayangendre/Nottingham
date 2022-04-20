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

import BasicTable from "./Table.js";
import Stock from "./Stock.js";

function Dynamic(props) {
  return (
    <div>
      <p1>Dynamic Page</p1>
    </div>
  );
}

export { Dynamic };
