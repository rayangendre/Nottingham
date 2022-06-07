import React from "react";
import Plot from "react-plotly.js";
import { articles } from "./News.js";
import { Container, Header } from "semantic-ui-react";
import { ArticleList } from "./ArticlesList.js";

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      ticker: this.props.symbol,
      articles: [],
      apiError: "",
    };
  }

  async componentDidMount() {
    this.fetchStock();
    try {
      const response = await articles(this.state.ticker);
      this.setState({ articles: response.articles });
    } catch (error) {
      this.setState({ apiError: "Could not find anything" });
    }
  }

  fetchStock() {
    const pointerToThis = this;
    console.log(pointerToThis);

    let API_Call =
      "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="
        .concat(this.state.ticker)
        .concat("&outputsize=compact&apikey=")
        .concat(process.env.REACT_APP_ALPHA_KEY);
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        for (var key in data["Time Series (Daily)"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(
            data["Time Series (Daily)"][key]["1. open"]
          );
        }

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
        });
      });
  }

  render() {
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 780, height: 440 }}
        />
        <Container>
          <Header as="h2" style={{ textAlign: "center", margin: 20 }}>
            News about {this.state.ticker}
          </Header>
          {this.state.articles.length > 0 && (
            <ArticleList articles={this.state.articles} />
          )}
          {this.state.apiError && (
            <p>Could not fetch any articles. Please try again.</p>
          )}
        </Container>
      </div>
    );
  }
}

export default Stock;
