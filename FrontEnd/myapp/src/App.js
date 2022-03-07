import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button"
import './App.css';
//import '../node_modules/react-vis/dist/style.css';
//import {XYPlot, LineSeries} from 'react-vis';
import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
const rest = restClient("nKHbbu_36PUwzwk9Ed90ViqDpxk4GFHH");
const stocksWS = websocketClient("nKHbbu_36PUwzwk9Ed90ViqDpxk4GFHH").stocks();

function App() {
  return (
    <div className="App">
      <h1>Welcome to Nottingham!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path="stockcheck" element={<StockCheck />} />
        <Route path="login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <div>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>The leader in stock portfolio</p>
      </main>
      <nav>
        <Link to="/portfolio">
          <button type="button" class="btn btn-outline-primary">
            Portfolio
          </button>
        </Link>
        <Link to="/watchlist">
          <button type="button" class="btn btn-outline-primary">
            Watchlist
          </button>
        </Link>
        <Link to="/stockcheck">
          <button type="button" class="btn btn-outline-primary">
            StockCheck
          </button>
        </Link>
        <Link to="/login">
          <button type="button" class="btn btn-outline-primary">
            Log In
          </button>
        </Link>
      </nav>
    </div>
  );
}

function Portfolio() {
  return (
    <>
      <main>
        <h2>Portfolio</h2>
        <p>
          Here all your stocks are listed out
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function Watchlist() {
  return (
    <>
      <main>
        <h2>Watchlist</h2>
        <p>
          Here you can track the stocks that you are currently interested in
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function LogIn() {
  return (
    <>
      <main>
        <h2>Log In</h2>
        <p>
          Log in to access your personalized portfolio, and buy/sell stocks
        </p>
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
    </>
  );
}

function StockCheck(){
  let myvalue, myquery;
//,5 , "day", 2021-07-22, 2021-07-22, myquery
  //rest.stocks.previousClose("C:AAPL", ).then((value) => { myvalue = value;}).catch(console.log("Error!\n"));
  stocksWS.onmessage = ({data}) => {
    const [message] = JSON.parse(data);
    stocksWS.send('{"action":"subscribe", "params":"AM.MSFT,A.MSFT"}');

    switch(message.ev){
      case "AM":
        
        break;
      case "A":
        break;
      
    }
  }
  stocksWS.send({action:"subscribe", params: "T.MSFT"});
  return (
    <>
      <main>
        <h2>StockCheck</h2>
          {/* socket.addEventListener('open', function(event) {
            socket.send(JSON.stringify({'type':'subscribe', 'symbol': 'AAPL'}))
          }); */}
          
        <p>
          The current price of AAPL is: {myvalue}
        </p>
      
      </main>
      <nav>
        <Link to="/">
          <button type="button" class="btn btn-outline-primary">
            Home
          </button>
        </Link>
      </nav>
      <div id='root' />
    </>
  );
}

export default App;