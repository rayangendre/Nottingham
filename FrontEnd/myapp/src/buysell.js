import logo from "./logo.svg";
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import React from "react";
import axios from "axios";

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      numberOfShares: null,
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumberChange(event) {
    const target = event.target;
    const num = target.value;
    // this.setState({name: event.target.name});
    this.setState({
      numberOfShares: num,
    });
  }

  handleNameChange(event) {
    const target = event.target;

    // this.setState({name: event.target.name});
    this.setState({
      name: target.value,
    });
  }
  //comment
  async validTicker(ticker) {
    const stockPrice = await axios.get(
      "https://finnhub.io/api/v1/quote?symbol="
        .concat(ticker.toUpperCase())
        .concat("&token=")
        .concat(process.env.REACT_APP_FINHUB_API_KEY)
    );

    const numPrice = parseFloat(stockPrice["data"]["c"]);
    console.log("price");
    console.log(numPrice);
    if (numPrice === 0) {
      console.log("returning false");
      return false;
    } else {
      return true;
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name != "" && this.state.numberOfShares != null) {
      if (
        isNaN(this.state.numberOfShares) ||
        this.state.numberOfShares <= 0 ||
        parseInt(this.state.numberOfShares) !=
          parseFloat(this.state.numberOfShares)
      ) {
        alert("Please enter a positive whole number.");
        return;
      }
      if (
        window.confirm(
          `Buy ${this.state.numberOfShares} shares of ${this.state.name}?`
        ) == true
      ) {
        const valid = await this.validTicker(this.state.name);
        if (valid) {
          let res = axios.patch(
            "http://localhost:4000/users/".concat(this.props.userId),
            {
              portfolioAddition: {
                name: this.state.name,
                numShares: parseInt(this.state.numberOfShares),
              },
              watchListAddition: "",
            }
          );
          alert(
            "Bought " +
              this.state.numberOfShares +
              " shares of " +
              this.state.name
          );
        } else {
          alert("Invalid stock name");
        }
      }
    } else {
      alert("Enter a stock to buy");
    }
  }

  render() {
    return (
      <>
        <Container>
          <main>
            <Row>
              <Col>
                <nav>
                  <Link to="/portfolio">
                    <button type="submit" class="btn btn-primary w-50">
                      Portfolio
                    </button>
                  </Link>
                </nav>
              </Col>
              <Col>
                <h2>Buy Stock</h2>
              </Col>
              <Col>
                <h2> </h2>
              </Col>
            </Row>
          </main>
        </Container>

        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Stock Name</Form.Label>
              <textarea
                class="form-control"
                rows="1"
                placeholder="StockName"
                value={this.state.name}
                onChange={this.handleNameChange}
              ></textarea>
              <Form.Text className="text-muted">
                Confidential Buying Service
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Number of Shares</Form.Label>
              <textarea
                class="form-control"
                rows="1"
                placeholder="Number of Shares"
                value={this.state.numberOfShares}
                onChange={(event) => this.handleNumberChange(event)}
              ></textarea>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
class Sell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      numberOfShares: null,
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumberChange(event) {
    const target = event.target;
    const num = target.value;
    // this.setState({name: event.target.name});
    this.setState({
      numberOfShares: num,
    });
  }

  handleNameChange(event) {
    const target = event.target;

    // this.setState({name: event.target.name});
    this.setState({
      name: target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.name != "" && this.state.numberOfShares != null) {
      if (
        isNaN(this.state.numberOfShares) ||
        this.state.numberOfShares <= 0 ||
        parseInt(this.state.numberOfShares) !=
          parseFloat(this.state.numberOfShares)
      ) {
        alert("Please enter a positive whole number.");
        return;
      }
      if (
        window.confirm(
          `Sell ${this.state.numberOfShares} shares of ${this.state.name}?`
        ) == true
      ) {
        let res = axios.put(
          "http://localhost:4000/users/".concat(this.props.userId),
          {
            portfolioSub: {
              name: this.state.name,
              numShares: parseInt(this.state.numberOfShares),
            },
            watchListSub: "",
          }
        );
        alert(
          "Sold " + this.state.numberOfShares + " shares of " + this.state.name
        );
      }
    } else {
      alert("Enter a stock to sell");
    }
  }

  render() {
    return (
      <>
        <Container>
          <main>
            <Row>
              <Col>
                <nav>
                  <Link to="/portfolio">
                    <button type="submit" class="btn btn-primary w-50">
                      Portfolio
                    </button>
                  </Link>
                </nav>
              </Col>
              <Col>
                <h2>Sell Stock</h2>
              </Col>
              <Col>
                <h2> </h2>
              </Col>
            </Row>
          </main>
        </Container>

        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Stock Name</Form.Label>
              <textarea
                class="form-control"
                rows="1"
                placeholder="StockName"
                value={this.state.name}
                onChange={this.handleNameChange}
              ></textarea>
              <Form.Text className="text-muted">
                Confidential Exchange Service
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Number of Shares</Form.Label>
              <textarea
                class="form-control"
                rows="1"
                placeholder="Number of Shares"
                value={this.state.numberOfShares}
                onChange={(event) => this.handleNumberChange(event)}
              ></textarea>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </>
    );
  }
}
export { Buy, Sell };
