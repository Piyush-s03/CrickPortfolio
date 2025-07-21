import React, { useState } from "react";

const Achievements = () => {
  const [selected, setSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState("");

  const staticAchievements = {
    "ICC Cricket World Cup Winners": [
      "1975 – West Indies", "1979 – West Indies", "1983 – India",
      "1987 – Australia", "1992 – Pakistan", "1996 – Sri Lanka",
      "1999 – Australia", "2003 – Australia", "2007 – Australia",
      "2011 – India", "2015 – Australia", "2019 – England", "2023 – Australia"
    ],
    "ICC T20 World Cup Winners": [
      "2007 – India", "2009 – Pakistan", "2010 – England", "2012 – West Indies",
      "2014 – Sri Lanka", "2016 – West Indies", "2021 – Australia", "2022 – England", "2024 – India"
    ],
    "IPL Winners List": [
      "2008 – Rajasthan Royals", "2009 – Deccan Chargers", "2010 – CSK",
      "2011 – CSK", "2012 – KKR", "2013 – MI", "2014 – KKR", "2015 – MI",
      "2016 – SRH", "2017 – MI", "2018 – CSK", "2019 – MI", "2020 – MI",
      "2021 – CSK", "2022 – GT", "2023 – CSK"
    ],
    "Top 10 ODI Batsmen": [
      "1. Virat Kohli", "2. Babar Azam", "3. Rohit Sharma",
      "4. Steve Smith", "5. Quinton de Kock", "6. David Warner",
      "7. Jos Buttler", "8. Kane Williamson", "9. Shubman Gill", "10. Fakhar Zaman"
    ],
    "Top 10 Test Bowlers": [
      "1. Pat Cummins", "2. Ravichandran Ashwin", "3. James Anderson",
      "4. Kagiso Rabada", "5. Jasprit Bumrah", "6. Tim Southee",
      "7. Shaheen Afridi", "8. Nathan Lyon", "9. Mohammed Shami", "10. Neil Wagner"
    ]
  };

  const handleSelect = (key) => {
    setSelected(key === selected ? "" : key);
    setApiData(null);
    setSearchTerm("");
    setError("");
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    const query = encodeURIComponent(searchTerm.trim());
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${query}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Not found");
      const data = await res.json();
      setApiData({
        title: data.title,
        summary: data.extract,
        image: data.thumbnail?.source
      });
      setError("");
    } catch (err) {
      setError("Achievement not found. Try modifying the title.");
      setApiData(null);
    }
  };

  return (
    <section id="achievements" className="container py-5">
      <h2 className="text-center text-warning display-5 fw-bold mb-4">
        <i className="fas fa-trophy text-warning me-2"></i>Achievements
      </h2>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
        {Object.keys(staticAchievements).map((key, index) => (
          <button
            key={index}
            className={`btn ${selected === key ? "btn-warning" : "btn-outline-warning"} px-4`}
            onClick={() => handleSelect(key)}
          >
            {key}
          </button>
        ))}
      </div>

      {selected && (
        <div className="bg-light p-4 rounded shadow mb-5">
          <h5 className="text-primary fw-bold">{selected}</h5>
          <ul className="mt-3">
            {staticAchievements[selected].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Wikipedia Search Section */}
      <div className="card p-4 shadow bg-white">
        <h5 className="mb-3 text-primary">Search Any Achievement</h5>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter achievement (e.g., Fastest ODI Century)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {apiData && (
          <div className="mt-4">
            <h6 className="fw-bold">{apiData.title}</h6>
            {apiData.image && (
              <img
                src={apiData.image}
                alt={apiData.title}
                className="img-fluid mb-3"
                style={{ maxHeight: "250px", objectFit: "cover" }}
              />
            )}
            <p>{apiData.summary}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
