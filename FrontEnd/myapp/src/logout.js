import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "./login-styles.css";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";

//fake user
//username: test3
//password: hello

function LogOut(props) {
  async function handleLogout() {
    props.setId("");
    props.setName("");
    props.setToken("");
  }

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
