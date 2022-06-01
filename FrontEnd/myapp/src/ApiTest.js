import { Component } from "react";

class ApiTest extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:4000/users")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render(setValue) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <p className="App-intro">{this.set.apiResponse}</p>
      </div>
    );
  }
}

export default ApiTest;
