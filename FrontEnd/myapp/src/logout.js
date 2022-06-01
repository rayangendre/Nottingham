import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import "./login-styles.css";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

//fake user
//username: test3
//password: hello

function LogOut(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  async function handleLogout(event) {
    props.setId("");
    props.setName("");
    props.setToken("");
  }

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form

  return (
    <div>
      <Row>
        <Col>
          <h2>Are you sure you want to log out of {props.userName}?</h2>
        </Col>
      </Row>
      <Row></Row>
      <nav>
        <Link to="/">
          <button
            type="submit"
            class="btn btn-primary w-25"
            onClick={handleLogout}
          >
            Log me out
          </button>
        </Link>
        <Link to="/">
          <button type="submit" class="btn btn-primary w-25">
            Keep me logged in!
          </button>
        </Link>
      </nav>
    </div>
  );
}

export { LogOut };
