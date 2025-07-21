import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const products = [
  {
    id: 1,
    name: "MRF Cricket Bat",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvU-D_t3iLnG2lL_uWatz5OOp5KTGChAMR0w&s",
    description: "Premium grade English Willow bat used by professionals.",
    link: "https://www.mrfsports.com"
  },
  {
    id: 2,
    name: "SG Test Ball",
    image: "https://m.media-amazon.com/images/I/51efYquBoeL.jpg",
    description: "High-quality leather ball for matches and practice.",
    link: "https://www.sgsports.com"
  },
  {
    id: 3,
    name: "Adidas Cricket Shoes",
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTGluxCqqb9iQHB5FxXc0bliXJW3tehpf_clftNpQTVd8oo3I5GU9A7p6cTqegR97N5aE4PLmklWEEaWnV8B8R8cmbven_BYnKRFJ2J_RnR0dN3FFKAPHge9g&usqp=CAc",
    description: "Comfortable shoes with extra grip for fast bowlers.",
    link: "https://www.adidas.co.in/cricket-shoes"
  }
];

const topIndianShops = [
  { name: "SG Sports", url: "https://www.sgsports.com" },
  { name: "MRF Sports", url: "https://www.mrfsports.com" },
  { name: "Decathlon India", url: "https://www.decathlon.in" },
  { name: "Sports365", url: "https://www.sports365.in" },
  { name: "Khelmart", url: "https://www.khelmart.com" },
  { name: "ProBatsman", url: "https://www.probatsman.com" },
  { name: "CricketMerchant", url: "https://www.cricketmerchant.in" },
  { name: "DSC Cricket", url: "https://www.dsc-cricket.com" },
  { name: "BAS Vampire", url: "https://www.basvampire.in" },
  { name: "Amazon India", url: "https://www.amazon.in/s?k=cricket+kit" }
];

const Shop = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="shop" className="py-5 text-white" style={{ background: "linear-gradient(to bottom right, #494444ff, #4faedaff)" }}>
      <div className="container">
        <h2 className="text-center mb-5 fw-bold display-5" data-aos="fade-down">
          🛒 Cricket Store
        </h2>

        <div className="row">
          {products.map((item) => (
            <div className="col-md-4 mb-4" key={item.id} data-aos="zoom-in">
              <div className="glass-card card h-100 border-0 shadow-lg">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "220px", objectFit: "cover", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.description}</p>
                  <a
                    href={item.link}
                    className="btn btn-outline-warning"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Store
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-5 border-light" />

        <h4 className="text-center mb-4 text-warning" data-aos="fade-up">Top 10 Indian Cricket Shops</h4>
        <ul className="list-group">
          {topIndianShops.map((shop, idx) => (
            <li
              key={idx}
              className="list-group-item d-flex justify-content-between align-items-center bg-dark text-light mb-2"
              data-aos="fade-right"
              data-aos-delay={idx * 100}
            >
              <span><i className="fas fa-store me-2 text-warning"></i> {shop.name}</span>
              <a
                href={shop.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-success"
              >
                Visit
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Shop;
