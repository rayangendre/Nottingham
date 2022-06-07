# Backend

## What it is

This is a backend API built with express.js in order to connect to our MongoDB database where we store information pertaining to our Stock Application

## Installation

Installation needs npm install to install all dependencies and needs npm start to start running the API which is hosted locally at http://localhost:4000/

## Schema

Our database schema has the following, which is detailed in the user.js file
{
"Username": the user name of our user,
"Pwd": the hashed password of our user,
"WatchList": a list of strings that contains the users stock watchlist
"PortfolioList": a list of JSON objects with the stock ticker and the number of shares that the user has bought
"Purchase_History": a list of JSON objects that have the stock ticker and the price at which it was purchased
}

## Testing

Tests can be run by running npm test. Tests can be found in the user-services.test.js file. These tests are also run every time in our continous integration pipeline and cause the failure of the build if they do not pass
