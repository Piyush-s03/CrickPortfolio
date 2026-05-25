import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div
        className="hero d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: "100vh",
          background: "url('/images/cricket-bg.jpg') center/cover no-repeat",
        }}
      >
        <div className="glass-card p-5">
          <h1 className="display-4 fw-bold mb-3">🏏 Cricket Info Portal</h1>
          <p className="lead mb-4">
            Explore Players, Teams, Live Scores & Everything Cricket!
          </p>
          <Link to="/players" className="btn btn-warning btn-lg">
            Get Started <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>

      {/* Highlight Cards */}
      <div className="container my-5">
        <div className="row">
          {[
            {
              title: "Players Info",
              icon: "fa-user",
              text: "Discover profiles of top international players.",
              link: "/players",
              color: "primary",
            },
            {
              title: "Live Scores",
              icon: "fa-chart-line",
              text: "Track real-time match scores from around the globe.",
              link: "/livescore",
              color: "danger",
            },
            {
              title: "Achievements",
              icon: "fa-trophy",
              text: "Explore World Cup winners, records & milestones.",
              link: "/achievements",
              color: "success",
            },
          ].map((card, idx) => (
            <div className="col-md-4 mb-4" key={idx} data-aos="fade-up">
              <div
                className={`glass-card text-center p-4 border-start border-${card.color}`}
                style={{
                  borderRadius: "1rem",
                  backdropFilter: "blur(10px)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
                  color: "#fff",
                }}
              >
                <i className={`fas ${card.icon} fa-3x text-${card.color} mb-3`}></i>
                <h5 className="fw-bold">{card.title}</h5>
                <p>{card.text}</p>
                <Link
                  to={card.link}
                  className={`btn btn-outline-${card.color} btn-sm`}
                >
                  Explore
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
