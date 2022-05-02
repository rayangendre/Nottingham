const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const articles = async (stockName) => {
  const response = await fetch(
    `https://newsapi.org/v2/everything?q=${stockName}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
  );
  const json = await response.json();
  return json;
};
