export const articles = async (stockName) => {
  // require('dotenv').config();
  const key = process.env.REACT_APP_NEWS_API_KEY;
  console.log(key);

  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${stockName}&sortBy=publishedAt&apiKey=${key}`
  );
  const json = await response.json();
  return json;
};
