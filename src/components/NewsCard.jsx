// ✅ Arrow function — Props: title, description, imageUrl, author, publishedAt, source, url
const NewsCard = ({ title, description, imageUrl, author, publishedAt, source, url }) => {

  // ✅ Arrow function — format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // ✅ Arrow function — truncate text
  const truncate = (text, max) => {
    if (!text) return "";
    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  return (
    <div className="news-card">

      {/* Image wrapper */}
      <div className="card-img-wrap">
        <img
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.src = "https://placehold.co/400x200/161616/f59e0b?text=No+Image";
          }}
        />
        {/* Tailwind absolute positioning for badge */}
        <span className="source-badge">{source}</span>
      </div>

      {/* Card body */}
      <div className="card-body-custom">
        <h5 className="card-title-custom">{truncate(title, 90)}</h5>
        <p className="card-desc">{truncate(description, 120)}</p>

        {/* Footer */}
        <div className="card-footer-custom">
          <div>
            <p className="card-author">
              {author ? `By ${truncate(author, 28)}` : "Unknown Author"}
            </p>
            <p className="card-date">📅 {formatDate(publishedAt)}</p>
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="read-btn">
            Read →
          </a>
        </div>
      </div>

    </div>
  );
};

export default NewsCard;