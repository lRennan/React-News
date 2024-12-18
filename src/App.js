import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              apiKey: "d7d26e50b9ff4943a4a5242ef7ac9a66",
            },
          }
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Error loading news.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>React News</h1>
      {loading && <p>Loading news...</p>}
      {error && <p>{error}</p>}
      <div style={styles.newsList}>
        {articles.map((article, index) => (
          <div key={index} style={styles.article}>
            <img
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "https://via.placeholder.com/300x200.png?text=No+Image"
              }
              alt={article.title || "No title"}
              style={styles.image}
            />
            <h2>{article.title}</h2>
            <p>{article.description || "No description available."}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    textAlign: "center",
  },
  title: {
    color: "#333",
  },
  newsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  article: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
    objectFit: "cover",
  },
};

export default App;
