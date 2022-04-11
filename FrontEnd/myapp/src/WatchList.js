import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Button from "react-bootstrap/Button"
import './App.css';
import './Table.js';
import React from 'react';
import {useState, useEffect} from 'react'

import { WatchlistTable } from "./Table.js";
import axios from "axios";


function createData(name, price){
  return {name, price}
}


function Watchlist(props) {

    //need to be getting the price of each stock through finhub, to be changed
    useEffect(() => {
      async function fetchAPI(props){
        if(props.userId !== ""){
          let response = await fetch("http://localhost:4000/users/".concat(props.userId)).then(res => res.json())
          let watchListTable = []
          
          for(var i = 0; i < response.users_list.watchList.length; i++){
            const price = await getPriceFromTicker(response.users_list.watchList[i]);
            watchListTable.push(createData(response.users_list.watchList[i], price))
          }
          setPersonalWatchlist(watchListTable)
        }else{
          setPersonalWatchlist([])
        }
      }
      fetchAPI(props)
    }, [])
  

    async function checkPrice(ticker){
      return await axios.get("https://finnhub.io/api/v1/quote?symbol=".concat(ticker).concat("&token=c9482oqad3if4j4v81qg"));
      // return await axios.get("https://api.polygon.io/v2/aggs/ticker/".concat(ticker).concat("/prev?adjusted=true&apiKey=").concat(apiKey))
    }

    async function getPriceFromTicker(ticker){
      const stockPrice = await checkPrice(ticker.toUpperCase())
      console.log(stockPrice)
      // const timeSeriesObject = stockPrice["data"]["Time Series (1min)"]
      //extract the first key from the JSON, corresponds to the latest minute of data returned
      // const firstKey = Object.keys(timeSeriesObject)[0]

      return parseFloat(stockPrice["data"]["c"]);
    }

  async function HandleSubmit(e){
    const toBeAdded = e.target.watch.value
    console.log(toBeAdded)
    e.preventDefault()
    if (personalWatchlist.includes(toBeAdded)) {
      alert("Already on watchlist")
      return
    }
    if (props.userId !== "") {
      const price = await getPriceFromTicker(toBeAdded)
      console.log(price)
      setPersonalWatchlist([...personalWatchlist, {"name": toBeAdded, "price": price}])
      await axios.patch("http://localhost:4000/users/".concat(props.userId), {"watchListAddition": toBeAdded})
    }
  }

  async function removeFromWL(e) {
    console.log(e)
    let newWatchlist = [].concat(personalWatchlist);
    newWatchlist = newWatchlist.filter(function(entry){
      return entry != e; 
    })
    console.log(newWatchlist) 
    setPersonalWatchlist(newWatchlist)
    await axios.put("http://localhost:4000/users/".concat(props.userId), {"watchListSub": e.name})
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
              <button type="submit" class="btn btn-outline-primary">Add To Watchlist</button>
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
        <WatchlistTable data={personalWatchlist} removeFromWL={removeFromWL}></WatchlistTable>
        
      </>
    );
  }

  export {Watchlist};