import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Stack from 'react-bootstrap/Stack'
import Form from 'react-bootstrap/Form'


const Buy = function(){
    return (
        <>
          <Container>
            <main>
              <Row>
                 <Col>Buy Stock</Col>
                 <Col>Sell Stock</Col>
              </Row>
              <p>
                Purchase stock in a secure way
              </p>
            </main>
          </Container>
          <Container>
            <nav>
              <Link to="/">
              <button type="submit" class="btn btn-primary w-50">Home</button>
              </Link>
            </nav>
          </Container>
          <Container>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Stock Name</Form.Label>
              <Form.Control type="text" placeholder="Stock Name" />
              <Form.Text className="text-muted">
                Confidential Buying Service
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Number of Shares</Form.Label>
              <Form.Control type="text" placeholder="Number of Shares" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          </Container>
        </>
      );
}

export default Buy;