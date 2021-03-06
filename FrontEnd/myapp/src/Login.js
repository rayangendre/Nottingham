import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { useState } from "react";
import "./login-styles.css";
import { useNavigate } from "react-router-dom";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

function LogIn(props) {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const navigate = useNavigate();

  async function handleSubmit(event) {
    //Prevent page reloadedd
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = await axios
      .post(process.env.REACT_APP_BACKEND_URL.concat("login"), {
        name: uname.value,
        pwd: pass.value,
      })
      .catch((error) => {
        console.log("caught 401 error");
        return error.response;
      });

    // Compare user info
    if (userData) {
      if (userData.status === 200) {
        props.setId(userData.data.id);
        console.log("ID in the login");
        console.log(userData.data.id);
        props.setName(userData.data.name);
        props.setToken(userData.data.token);
        console.log(userData);
        setIsSubmitted(true);
        // sleep(1000);
        navigate("/");
      } else if (userData.status === 401) {
        if (userData.data.error === "Unauthorized Username") {
          setErrorMessages({ name: "uname", message: errors.uname });
        } else {
          setErrorMessages({ name: "pass", message: errors.pass });
        }
      }
    }
  }

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
        <Col></Col>
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
