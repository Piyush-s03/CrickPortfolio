import React, { useState } from "react";

const teamNames = [
  "India national cricket team",
  "Australia national cricket team",
  "England cricket team",
  "Pakistan national cricket team",
  "New Zealand national cricket team",
  "South Africa national cricket team",
  "Sri Lanka national cricket team",
  "Bangladesh national cricket team",
  "Afghanistan national cricket team",
  "West Indies cricket team"
];

const Teams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTeamInfo = async (team) => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(team)}`
      );
      const data = await res.json();
      return {
        name: data.title,
        description: data.extract,
        image: data.thumbnail?.source || null
      };
    } catch {
      return { name: team, description: "Info not available", image: null };
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    const filtered = teamNames.filter((team) =>
      team.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const info = await Promise.all(filtered.map(fetchTeamInfo));
    setResults(info);
    setLoading(false);
  };

  return (
    <section id="teams" className="py-5 bg-transparent">
      <div className="container">
        <h2 className="text-center text-warning mb-4 display-5 fw-bold">
          <i className="fas fa-users me-2"></i>Cricket Teams
        </h2>

        <div className="input-group mb-4 bg-transparent">
          <input
            type="text"
            className="form-control"
            placeholder="Search a team name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          /> <br />
          <button className="btn btn-warning ms-2" onClick={handleSearch}>
            Search
          </button>
        </div>

        {loading && <p className="text-center">Loading teams...</p>}

        <div className="row">
          {results.map((team, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card text-dark h-100 shadow">
                {team.image && (
                  <img
                    src={team.image}
                    className="card-img-top"
                    alt={team.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{team.name}</h5>
                  <p className="card-text">{team.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && results.length === 0 && (
          <p className="text-center text-dark">No results found. Try a different name.</p>
        )}
      </div>
    </section>
  );
};

export default Teams;
