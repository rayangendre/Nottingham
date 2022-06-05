import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import "./login-styles.css";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";

function SignUp(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const navigate = useNavigate();

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
      .post(process.env.REACT_APP_BACKEND_URL.concat("signup"), {
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
      if (userData.status === 201) {
        props.setId(userData.data.id);
        props.setName(userData.data.name);
        setIsSubmitted(true);
        navigate("/");
      } else if (userData.status === 409) {
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
          <nav></nav>
        </Col>
        <Col>
          <h2>Welcome</h2>
        </Col>
        <Col>
          <p>
            Already have an account?&nbsp;
            <Link to="/login">Log In</Link>
          </p>
        </Col>
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
