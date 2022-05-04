import React from "react";
import { List } from "semantic-ui-react";

const ArticleList = (props) => {
  console.log(props);
  return (
    <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
      {props.articles.map((article) => (
        <List.Item key={article.title}>{article.title}</List.Item>
      ))}
    </List>
  );
};

export { ArticleList };
