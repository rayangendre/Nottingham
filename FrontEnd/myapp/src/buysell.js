import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"

const Buy = function(){
    return (
        <>
          <main>
            <h2>Buy Stock</h2>
            <p>
              Purchase stock in a secure way
            </p>
          </main>
          <nav>
            <Link to="/">
               <Button variant="outline-light" size ="lg">
                Home
              </Button>
            </Link>
          </nav>
        </>
      );
}

export default Buy;