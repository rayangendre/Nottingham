import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'
import React from 'react'


class Buy extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      numberOfShares: null
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
      numberOfShares:num
    });
  }

  handleNameChange(event) {
    const target = event.target;
    
    // this.setState({name: event.target.name});
    this.setState({
      name:target.value
    });
  }

  handleSubmit(event) {
    alert('Bought ' + this.state.numberOfShares + ' shares of ' + this.state.name);
    event.preventDefault();
  }
  render(){
    return (
      <>
        <Container>
          <main>
            <Row>
               <Col>
                  <nav>
                    <Link to="/">
                      <button type="submit" class="btn btn-primary w-50">Home</button>
                    </Link>
                    <Link to="/portfolio">
                      <button type="submit" class="btn btn-primary w-50">Portfolio</button>
                    </Link>
                  </nav>
               </Col>
               <Col><h2>Buy Stock</h2></Col>
               <Col><h2>         </h2></Col>
            </Row>
          </main>
        </Container>

        <Container>
        <Form onSubmit = {this.handleSubmit}> 
          <Form.Group className="mb-3">
            <Form.Label>Stock Name</Form.Label>
            <textarea class="form-control" rows="1" placeholder = 'StockName' value = {this.state.name} onChange ={this.handleNameChange}></textarea>
            <Form.Text className="text-muted">
              Confidential Buying Service
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Number of Shares</Form.Label>
            <textarea class="form-control" rows="1" placeholder = 'Number of Shares' value = {this.state.numberOfShares} onChange ={(event) => this.handleNumberChange(event)}></textarea>
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
class Sell extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      name: '', 
      numberOfShares: null
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
      numberOfShares:num
    });
  }

  handleNameChange(event) {
    const target = event.target;
    
    // this.setState({name: event.target.name});
    this.setState({
      name:target.value
    });
  }

  handleSubmit(event) {
    alert('Sold ' + this.state.numberOfShares + ' shares of ' + this.state.name);
    event.preventDefault();
  }

  render(){
    return (
      <>
        <Container>
          <main>
            <Row>
               <Col>
                  <nav>
                    <Link to="/">
                      <button type="submit" class="btn btn-primary w-50">Home</button>
                    </Link>
                    <Link to="/portfolio">
                      <button type="submit" class="btn btn-primary w-50">Portfolio</button>
                    </Link>
                  </nav>
               </Col>
               <Col><h2>Sell Stock</h2></Col>
               <Col><h2>         </h2></Col>
            </Row>
          </main>
        </Container>

        <Container>
        <Form onSubmit = {this.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Stock Name</Form.Label>
            <textarea class="form-control" rows="1" placeholder = 'StockName' value = {this.state.name} onChange ={this.handleNameChange}></textarea>
            <Form.Text className="text-muted">
              Confidential Exchange Service
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Number of Shares</Form.Label>
            <textarea class="form-control" rows="1" placeholder = 'Number of Shares' value = {this.state.numberOfShares} onChange ={(event) => this.handleNumberChange(event)}></textarea>
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
export {Buy, Sell};
