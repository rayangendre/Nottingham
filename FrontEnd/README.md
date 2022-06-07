# Frontend

## Directory

cd into the myapp directory, where the frontend project is currently held. Then the rest of this document can be executed

## Frontend

### Dependencies

run npm install to install all of the needed dependencies
run npm start to start the Frontend on http://localhost:3000/

### Acceptance Testing

In the cypress folder are acceptance tests that run locally to test the API functionality and the UI. The Frontend and the Backend have to be up and running in order for these tests to be run. The command to start cypress is: ./node_modules/.bin/cypress open

### Environment Variables

REACT_APP_NEWS_API_KEY - api key for the newsapi, can be found at the following link: https://newsapi.org

REACT_APP_FINHUB_API_KEY - api key for finhub stock api: https://finnhub.io

REACT_APP_ALPHA_KEY - api key for alphavantage stock api, used for charting: https://www.alphavantage.co

REACT_APP_BACKEND_URL: depends on environment. Locally it is http://localhost:4000/, and deployed it is https://nottingham-csc309.herokuapp.com/
