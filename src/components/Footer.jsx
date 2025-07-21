// // src/components/Footer.jsx
// import React from 'react'

// const Footer = () => {
//   return (
//     <footer className="bg-dark text-light text-center py-3 mt-5">
//       <p>© 2025 Cricket Info Portal | Contact: cricketinfo@dummy.com | +91-9876543210</p>
//     </footer>
//   )
// }

// export default Footer


// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="glass-footer text-center text-white py-4">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} CricVerse | Built with ❤️ for Cricket Lovers</p>
        <div className="social-icons mt-2">
          <a href="https://facebook.com" className="text-white me-3">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="https://instagram.com" className="text-white me-3">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="https://github.com" className="text-white me-3">
            <i className="fab fa-github fa-lg"></i>
          </a>
          <a href="mailto:contact@cricverse.com" className="text-white">
            <i className="fas fa-envelope fa-lg"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
