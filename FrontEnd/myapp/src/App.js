import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>Welcome to Nottingham!</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="watchlist" element={<Watchlist />} />
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
        <Link to="/portfolio">Portfolio   </Link>
        <Link to="/watchlist">Watchlist</Link>
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
        <Link to="/">Home</Link>
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
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
