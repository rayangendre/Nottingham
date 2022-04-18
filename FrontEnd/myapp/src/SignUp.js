import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import "./login-styles.css";

import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

function SignUp(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info

  const errors = {
    fail: "failed to create user",
    exists: "user exists already",
  };

  async function handleSubmit(event) {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Sign up user
    const userData = await axios
      .post("http://localhost:4000/signup", {
        name: uname.value,
        pwd: pass.value,
      })
      .catch((error) => {
        console.log("caught error");
        return error.response;
      });

    console.log(userData);

    // Compare user info
    if (userData) {
      if (userData.status == 201) {
        props.setId(userData.data.id);
        props.setName(userData.data.name);
        setIsSubmitted(true);
      } else if (userData.status == 409) {
        setErrorMessages({ name: "exists", message: errors.exists });
      } else {
        setErrorMessages({ name: "fail", message: errors.fail });
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
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("exists")}
          {renderErrorMessage("fail")}
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
        <Col></Col>
      </Row>
      <div className="app">
        <div className="login-form">
          <div className="title">Sign Up for Account</div>
          {isSubmitted ? <div>User was successfully created</div> : renderForm}
        </div>
      </div>
    </div>
  );
}

export { SignUp };
