// src/pages/LiveScore.jsx
import React from "react";
import "./LiveScore.css";

const dummyMatches = [
  {
    teams: "India vs Australia",
    score: "IND 265/5 (45.2) | AUS yet to bat",
    status: "India batting first. 50 overs match.",
  },
  {
    teams: "England vs Pakistan",
    score: "PAK 187/9 (42.4) | ENG 192/6 (39.3)",
    status: "England won by 4 wickets.",
  },
  {
    teams: "South Africa vs New Zealand",
    score: "SA 320/4 (50) | NZ 301/9 (50)",
    status: "South Africa won by 19 runs.",
  },
];

const LiveScore = () => {
  return (
    <div className="container py-5" id="livescore">
      <h2 className="text-center mb-5 fw-bold text-light">🏏 Live Cricket Scores</h2>

      <div className="row">
        {dummyMatches.map((match, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="glass-card p-4 text-white h-100 shadow">
              <h4 className="mb-3">{match.teams}</h4>
              <p><strong>Score:</strong> {match.score}</p>
              <p className="text-warning"><strong>Status:</strong> {match.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveScore;
