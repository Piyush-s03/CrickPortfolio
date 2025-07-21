import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Grounds = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groundInfo, setGroundInfo] = useState(null);
  const [error, setError] = useState("");

  // ✅ Proper place for AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const searchGround = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setError("Please enter a ground or stadium name.");
      return;
    }

    setError("");
    setGroundInfo(null);

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Ground not found");

      const data = await res.json();
      setGroundInfo({
        title: data.title,
        description: data.extract,
        image: data.thumbnail?.source || null,
      });
    } catch (err) {
      setError("Ground not found. Try names like 'Wankhede Stadium', 'Lords', etc.");
    }
  };

  return (
    <section id="grounds" className="py-5 bg-transparent">
      <div className="container">
        <h2 className="text-center text-white mb-5 fw-bold" data-aos="fade-up">
          Cricket Grounds & Stadiums
        </h2>

        {/* Info Cards */}
        <div className="row text-center mb-5">
          <div className="col-md-4 mb-3" data-aos="fade-up">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">What are Cricket Grounds?</h5>
                <p>Cricket grounds are iconic locations where matches are hosted across the world.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="100">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Why Important?</h5>
                <p>Knowing famous grounds builds geographical and historic understanding of the sport.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-3" data-aos="fade-up" data-aos-delay="200">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">How to Use?</h5>
                <p>Search for any stadium name like "MCG", "Lords", or "Eden Gardens" to get full details.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="input-group mb-4" data-aos="fade-right">
          <input
            type="text"
            className="form-control bg-transparent text-white"
            placeholder="Enter ground/stadium name (e.g., MCG, Eden Gardens)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchGround()}
          />
          <button className="btn btn-primary ms-2" onClick={searchGround}>
            Search
          </button>
        </div>

        {error && <p className="text-danger">{error}</p>}

        {/* Result Card */}
        {groundInfo && (
          <div className="card mx-auto shadow" style={{ maxWidth: "600px" }} data-aos="zoom-in">
            {groundInfo.image && (
              <img
                src={groundInfo.image}
                className="card-img-top"
                alt={groundInfo.title}
                style={{ maxHeight: "300px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{groundInfo.title}</h5>
              <p className="card-text">{groundInfo.description}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Grounds;
