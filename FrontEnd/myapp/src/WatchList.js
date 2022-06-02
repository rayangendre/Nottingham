import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import Button from "react-bootstrap/Button"
import "./App.css";
import "./Table.js";
import React from "react";
import { useState, useEffect } from "react";

import { WatchlistTable } from "./Table.js";
import axios from "axios";

function createData(name, price) {
  return { name, price };
}

function Watchlist(props) {
  //need to be getting the price of each stock through finhub, to be changed
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchAPI(props) {
      if (!props.userId) {
        navigate("/login", { replace: true });
        window.alert("Please login to view your watchlist!");
        return;
      }
      let response = await fetch(
        process.env.REACT_APP_BACKEND_URL.concat("users/").concat(props.userId)
      ).then((res) => res.json());
      let watchListTable = [];

      for (var i = 0; i < response.users_list.watchList.length; i++) {
        const price = await getPriceFromTicker(
          response.users_list.watchList[i]
        );
        watchListTable.push(
          createData(response.users_list.watchList[i], price)
        );
      }
      setPersonalWatchlist(watchListTable);
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

  async function validTicker(ticker) {
    const stockPrice = await axios.get(
      "https://finnhub.io/api/v1/quote?symbol="
        .concat(ticker.toUpperCase())
        .concat("&token=")
        .concat(process.env.REACT_APP_FINHUB_API_KEY)
    );

    const numPrice = parseFloat(stockPrice["data"]["c"]);
    console.log("price");
    console.log(numPrice);
    return numPrice;
    // if (numPrice === 0) {
    //   console.log("returning false");
    //   return false;
    // } else {
    //   return true;
    // }
  }

  async function HandleSubmit(e) {
    const toBeAdded = e.target.watch.value;
    console.log(toBeAdded);
    e.preventDefault();
    if (
      personalWatchlist.findIndex((item) => {
        return item.name === toBeAdded;
      }) !== -1
    ) {
      alert("Already on watchlist");
      return;
    }
    if (props.userId !== "") {
      // const price = await getPriceFromTicker(toBeAdded);
      const price = await validTicker(toBeAdded);
      console.log(price);
      if (price != 0) {
        setPersonalWatchlist([
          ...personalWatchlist,
          { name: toBeAdded, price: price },
        ]);
        await axios.patch(
          process.env.REACT_APP_BACKEND_URL.concat("users/").concat(
            props.userId
          ),
          {
            watchListAddition: toBeAdded,
          }
        );
      } else {
        alert("Invalid stock name");
      }
    }
  }

  async function removeFromWL(e) {
    console.log(e);
    let newWatchlist = [].concat(personalWatchlist);
    newWatchlist = newWatchlist.filter(function (entry) {
      return entry !== e;
    });
    console.log(newWatchlist);
    setPersonalWatchlist(newWatchlist);
    await axios.put(
      process.env.REACT_APP_BACKEND_URL.concat("users/").concat(props.userId),
      {
        watchListSub: e.name,
      }
    );
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
            <input
              name="watch"
              type="text"
              class="form-control"
              placeholder="Enter a stock ticker..."
            />
            <button type="submit" class="btn btn-outline-primary">
              Add To Watchlist
            </button>
          </div>
        </form>
      </main>
      <WatchlistTable
        data={personalWatchlist}
        removeFromWL={removeFromWL}
      ></WatchlistTable>
    </>
  );
}

export { Watchlist };
