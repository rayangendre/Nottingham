import { Component } from "react";

class ApiTest extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch(process.env.REACT_APP_BACKEND_URL.concat("users"))
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
