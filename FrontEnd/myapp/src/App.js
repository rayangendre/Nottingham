import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./Table.js";
import "./index.css";
import Navbar from "./Navigation/Navbar.js";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { Routes } from "react-router-dom";

require("dotenv").config();

function App() {
  return (
    <div class="center">
      <Navbar />
    </div>
  );
}

export default App;
