import React from "react";
import Plot from "react-plotly.js";

class StockChart extends React.Component {
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

        // console.log(stockChartXValuesFunction);
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
      </div>
    );
  }
}

export default StockChart;
