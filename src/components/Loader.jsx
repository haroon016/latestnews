// ✅ Arrow function component
const Loader = () => {
  return (
    <div className="loader-wrap">

      {/* Spinner with ₿ */}
      <div className="spinner-ring">
        <span className="spinner-symbol">₿</span>
      </div>

      {/* Tailwind text-center */}
      <div className="text-center">
        <p className="loader-text">Fetching latest news...</p>
        <p className="loader-sub">Connecting to NewsAPI</p>
      </div>

      {/* Bootstrap grid skeleton */}
      <div className="row g-4 w-100 mt-2" style={{ maxWidth: "960px" }}>
        {[1, 2, 3].map((i) => (
          <div className="col-12 col-sm-6 col-lg-4" key={i}>
            <div className="skeleton-card">
              <div className="skeleton-box" style={{ height: "200px", borderRadius: 0 }} />
              <div className="p-4 d-flex flex-column gap-2">
                <div className="skeleton-box" style={{ height: "16px", width: "85%" }} />
                <div className="skeleton-box" style={{ height: "12px", width: "65%" }} />
                <div className="skeleton-box" style={{ height: "12px", width: "75%" }} />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Loader;