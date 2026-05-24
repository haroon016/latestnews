import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import Loader from "./components/Loader";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [searchQuery, setSearchQuery] = useState("bitcoin");

  const API_KEY = "9ce5842e278e4ffab6f5515ed4e173a5";

  // ✅ Arrow function — fetch news from API
  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    // "All" fetches general top news
    const apiQuery = query === "All" ? "latest news today" : query;
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${apiQuery}&apiKey=${API_KEY}&pageSize=12&language=en`
      );
      const data = await response.json();

      if (data.status === "ok") {
        const filtered = data.articles.filter(
          (a) => a.title && a.urlToImage && a.description
        );
        setArticles(filtered);
      } else {
        setError("Failed to fetch news. Please try again.");
      }
    } catch (err) {
      setError("Network error. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ useEffect — runs whenever searchQuery changes
  useEffect(() => {
    fetchNews(searchQuery);
  }, [searchQuery]);

  // ✅ Arrow function passed as Prop to Navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0d0d0d" }}>

      {/* Navbar — receives handleSearch as Prop */}
      <Navbar onSearch={handleSearch} currentQuery={searchQuery} />

      <main className="main-wrapper">
        <Container>

          {/* Status bar */}
          {!loading && !error && (
            <div>
              <div className="feed-label">🔥 Live News Feed by Haroon Bajwa</div>
              <p className="result-count">
                {articles.length} articles found for <span>"{searchQuery}"</span>
              </p>
            </div>
          )}

          {/* Loader */}
          {loading && <Loader />}

          {/* Error */}
          {error && (
            <div className="error-wrap">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
              <p style={{ color: "#e55", fontSize: "1.1rem", marginBottom: "20px" }}>{error}</p>
              <button className="retry-btn" onClick={() => fetchNews(searchQuery)}>
                Try Again
              </button>
            </div>
          )}

          {/* ✅ .map() — renders a NewsCard for each article */}
          {!loading && !error && (
            <div className="row g-4">
              {articles.map((article, index) => (
                <div className="col-12 col-sm-6 col-lg-4" key={index}>
                  {/* NewsCard receives article data as Props */}
                  <NewsCard
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    author={article.author}
                    publishedAt={article.publishedAt}
                    source={article.source.name}
                    url={article.url}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <div className="error-wrap">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📰</div>
              <p style={{ color: "#666", fontSize: "1.1rem" }}>
                No articles found for "{searchQuery}"
              </p>
            </div>
          )}

        </Container>
      </main>
    </div>
  );
};

export default App;