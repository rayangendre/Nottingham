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

function LogIn(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

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
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div>
      <Row>
        <Col>
          <nav>
            <Link to="/">
              <button type="submit" class="btn btn-primary w-25">
                Home
              </button>
            </Link>
          </nav>
        </Col>
        <Col>
          <h2>Welcome</h2>
        </Col>
        <Col>
          <p>
            Don't have an account?&nbsp;
            <Link to="/signup">Sign Up</Link>
          </p>
        </Col>
      </Row>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
        </div>
      </div>
    </div>
  );
}

export { LogIn };
