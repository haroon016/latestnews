import { useState } from "react";
import { Container, InputGroup, Form, Button } from "react-bootstrap";

// ✅ Arrow function — receives onSearch and currentQuery as Props
const Navbar = ({ onSearch, currentQuery = "" }) => {
  const [input, setInput] = useState("");

  const topics = ["All", "Bitcoin", "Ethereum", "Crypto", "Stocks", "AI", "Tesla"];

  // ✅ Arrow function — handles search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim()); // calling the Prop function
      setInput("");
    }
  };

  return (
    <nav className="crypto-navbar">
      <Container>
        <div className="navbar-inner">

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
            <div className="brand-logo">₿</div>
            <div>
              <p className="brand-title">CryptoNews</p>
              <p className="brand-sub">Live Feed</p>
            </div>
          </div>

          {/* Search + Pills stacked on the right */}
          <div className="navbar-right">

            {/* Search bar */}
            <form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  className="search-input"
                  type="text"
                  placeholder="Search news... (e.g. ethereum, NFT)"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit" className="search-btn">
                  Search
                </Button>
              </InputGroup>
            </form>

            {/* Topic pills */}
            <div className="pills-row">
              {topics.map((topic) => (
                <button
                  key={topic}
                  className={`topic-pill ${(currentQuery || "").toLowerCase() === topic.toLowerCase() ? "active" : ""}`}
                  onClick={() => onSearch(topic)}
                >
                  {topic}
                </button>
              ))}
            </div>

          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;