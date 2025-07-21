import React, { useState } from "react";

const History = () => {
  const [formatsInfo, setFormatsInfo] = useState({});
  const [showFormats, setShowFormats] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatsList = [
    "Test cricket",
    "One Day International",
    "Twenty20",
    "ICC Cricket World Cup",
    "ICC T20 World Cup",
    "ICC Champions Trophy",
    "Asia Cup",
    "Indian Premier League",
    "Big Bash League",
    "The Hundred (cricket)",
    "Abu Dhabi T10 League"
  ];

  const fetchFormatInfo = async (format) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(format)}`
      );
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      return {
        title: data.title,
        extract: data.extract,
        thumbnail: data.thumbnail?.source || null
      };
    } catch {
      return { title: format, extract: "Information not found.", thumbnail: null };
    }
  };

  const handleShowFormats = async () => {
    setShowFormats(!showFormats);
    if (!showFormats && Object.keys(formatsInfo).length === 0) {
      setLoading(true);
      setError("");
      const infoObj = {};
      for (const fmt of formatsList) {
        infoObj[fmt] = await fetchFormatInfo(fmt);
      }
      setFormatsInfo(infoObj);
      setLoading(false);
    }
  };

  return (
    <section id="history" className="py-5 bg-dark text-white">
      <div className="container">
        <h2 className="text-center mb-4 display-6 fw-bold">
          Cricket History <i className="fas fa-book-open ms-2"></i>
        </h2>

        <p>
          <strong>How Cricket Started:</strong> Cricket originated in south-east England in the late 16th century.
          It became the national sport of England in the 18th century and spread globally with the expansion of the
          British Empire. The first international match was played between the United States and Canada in 1844,
          and the first Test match was between England and Australia in 1877. Since then, cricket has evolved into
          various modern formats loved by fans worldwide.
        </p>

        <div className="text-center mt-4">
          <button
            className="btn btn-outline-primary"
            onClick={handleShowFormats}
            disabled={loading}
          >
            {showFormats ? "Hide All Formats" : "Show All Formats"}
          </button>
        </div>

        {loading && <p className="mt-3 text-center">Loading formats...</p>}
        {error && <p className="text-danger text-center">{error}</p>}

        {showFormats && !loading && (
          <div className="mt-4">
            {formatsList.map((fmt, idx) => {
              const info = formatsInfo[fmt];
              return (
                <div key={idx} className="mb-5 border-bottom pb-3">
                  <h5 className="text-info fw-bold">{info?.title || fmt}</h5>
                  {info?.thumbnail && (
                    <img
                      src={info.thumbnail}
                      alt={info.title}
                      style={{ maxWidth: "200px" }}
                      className="mb-3 img-fluid"
                    />
                  )}
                  <p>{info?.extract}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default History;
