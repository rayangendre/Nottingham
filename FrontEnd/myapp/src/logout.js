import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
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

  async function handleSubmit(event) {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = await axios
      .post("http://localhost:4000/login", {
        name: uname.value,
        pwd: pass.value,
      })
      .catch((error) => {
        console.log("caught 401 error");
        return error.response;
      });

    // Compare user info
    if (userData) {
      if (userData.status == 200) {
        props.setId(userData.data.id);
        console.log("ID in the login");
        console.log(userData.data.id);
        props.setName(userData.data.name);
        props.setToken(userData.data.token);
        console.log(userData);
        setIsSubmitted(true);
      } else if (userData.status == 401) {
        if (userData.data.error == "Unauthorized Username") {
          setErrorMessages({ name: "uname", message: errors.uname });
        } else {
          setErrorMessages({ name: "pass", message: errors.pass });
        }
      }
    }
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
        <Col></Col>
        <Col>
          <h2>Are you sure you want to log out of {props.userName} </h2>
        </Col>
      </Row>
      <nav>
        <Link to="/">
          <button type="submit" class="btn btn-primary w-25">
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
