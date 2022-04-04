import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';
import React from 'react';
import {useState, useEffect} from 'react'

import { WatchlistTable } from "./Table.js";
import axios from "axios";



function Watchlist(props) {

    //need to be getting the price of each stock through finhub, to be changed
    useEffect(() => {
      if(props.userId != ""){
        fetch("http://localhost:4000/users/".concat(props.userId)).then(res => res.json()).then(data => {
        setPersonalWatchlist(data.users_list.watchList)
        //console.log(data.users_list.watchList)
      })
      }else{
        setPersonalWatchlist([])
      }
    }, [])
  
    
  async function HandleSubmit(e){
    const toBeAdded = e.target.watch.value
    console.log(toBeAdded)
    e.preventDefault()
    if (props.userId !== "") {
      setPersonalWatchlist([...personalWatchlist, toBeAdded])
      await axios.patch("http://localhost:4000/users/".concat(props.userId), {"watchListAddition": toBeAdded})
    }
  }
  
  
    const [personalWatchlist, setPersonalWatchlist] = useState([]);
  
  
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
        {WatchlistTable(personalWatchlist)}
      </>
    );
  }

  export {Watchlist};