import React, { useState } from "react";

const rulesList = [
  "Cricket",
  "Batting (cricket)",
  "Bowling (cricket)",
  "Dismissal (cricket)",
  "Umpire (cricket)",
  "Fielding (cricket)",
  "Decision Review System",
  "No ball",
  "Powerplay (cricket)",
  "Innings"
];

const Rules = () => {
  const [selectedRule, setSelectedRule] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRule = async (title) => {
    setSelectedRule(null);
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
      );
      if (!res.ok) throw new Error("Fetch failed");
      const data = await res.json();
      setSelectedRule({
        title: data.title,
        content: data.extract,
        image: data.thumbnail?.source || null
      });
    } catch (err) {
      setError("Could not fetch rule information. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="rules" className="container py-5 text-white">
      <h2 className="text-center mb-4 display-5 fw-bold">
        <i className="fas fa-gavel text-warning me-2"></i>Top 10 Rules of Cricket
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {rulesList.map((rule, i) => (
          <button
            key={i}
            className={`btn ${selectedRule?.title === rule ? "btn-warning" : "btn-outline-light"}`}
            onClick={() => fetchRule(rule)}
          >
            {rule}
          </button>
        ))}
      </div>

      {loading && <p className="text-center text-light">Loading rule info...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {selectedRule && (
        <div className="card mx-auto bg-light text-dark shadow-lg" style={{ maxWidth: "800px" }}>
          {selectedRule.image && (
            <img
              src={selectedRule.image}
              alt={selectedRule.title}
              className="card-img-top"
              style={{ maxHeight: "320px", objectFit: "cover" }}
            />
          )}
          <div className="card-body">
            <h4 className="card-title text-primary">{selectedRule.title}</h4>
            <p className="card-text">{selectedRule.content}</p>
          </div>
        </div>
      )}

      {!selectedRule && !loading && (
        <p className="text-center text-muted">Click a rule above to learn more.</p>
      )}
    </div>
  );
};

export default Rules;
