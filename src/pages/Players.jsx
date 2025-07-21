// import React, { useState } from "react";

// const Players = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [playerInfo, setPlayerInfo] = useState(null);
//   const [error, setError] = useState("");

//   const searchPlayer = async () => {
//     const term = searchTerm.trim();
//     if (!term) {
//       setError("Please enter a player name.");
//       return;
//     }

//     setError("");
//     setPlayerInfo(null);

//     const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;

//     try {
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Player not found");

//       const data = await res.json();
//       setPlayerInfo({
//         title: data.title,
//         description: data.extract,
//         image: data.thumbnail?.source || null,
//       });
//     } catch (err) {
//       setError("Player not found. Try names like 'Virat Kohli', 'Sachin Tendulkar', etc.");
//     }
//   };

//   return (
//     <section id="players" className="py-5 bg-transparent">
//       <div className="container">

       
//         <div className="row text-center mb-5">
//           <div className="col-md-4 mb-3">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">What is This?</h5>
//                 <p>This section lets you search and view player details using Wikipedia's public API.</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">Why Important?</h5>
//                 <p>Understanding players’ profiles helps fans, students, and analysts appreciate their careers.</p>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-4 mb-3">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body">
//                 <h5 className="card-title">How to Use?</h5>
//                 <p>Enter a cricketer's name and click Search to get a live summary including image and bio.</p>
//               </div>
//             </div>
//           </div>
//         </div>

       
//         <div className="input-group mb-4">
//           <input
//             type="text"
//             className="form-control bg-transparent text-primary"
//             placeholder="Enter player name (e.g., Virat Kohli)"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && searchPlayer()}
//           />
//           <button className="btn btn-primary ms-2" onClick={searchPlayer}>
//             Search
//           </button>
//         </div>

       
//         {error && <p className="text-danger">{error}</p>}

       
//         {playerInfo && (
//           <div className="card mx-auto shadow" style={{ maxWidth: "600px" }}>
//             {playerInfo.image && (
//               <img
//                 src={playerInfo.image}
//                 className="card-img-top"
//                 alt={playerInfo.title}
//                 style={{ maxHeight: "300px", objectFit: "cover" }}
//               />
//             )}
//             <div className="card-body">
//               <h5 className="card-title">{playerInfo.title}</h5>
//               <p className="card-text">{playerInfo.description}</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Players;


import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Players = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playerInfo, setPlayerInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const searchPlayer = async () => {
    const term = searchTerm.trim();
    if (!term) {
      setError("Please enter a player name.");
      return;
    }

    setError("");
    setPlayerInfo(null);

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Player not found");

      const data = await res.json();
      setPlayerInfo({
        title: data.title,
        description: data.extract,
        image: data.thumbnail?.source || null,
      });
    } catch (err) {
      setError("Player not found. Try names like 'Virat Kohli', 'Sachin Tendulkar', etc.");
    }
  };

  return (
    <section id="players" className="py-5 bg-transparent">
      <div className="container">
        {/* Header Cards */}
        <div className="row text-center mb-5" data-aos="fade-up">
          {[
            {
              title: "What is This?",
              text: "This section lets you search and view player details using Wikipedia's public API.",
            },
            {
              title: "Why Important?",
              text: "Understanding players’ profiles helps fans, students, and analysts appreciate their careers.",
            },
            {
              title: "How to Use?",
              text: "Enter a cricketer's name and click Search to get a live summary including image and bio.",
            },
          ].map((item, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card h-100 shadow-sm" data-aos="zoom-in">
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search Input */}
        <div className="input-group mb-4" data-aos="fade-right">
          <input
            type="text"
            className="form-control  text-white"
            placeholder="Enter player name (e.g., Virat Kohli)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchPlayer()}
          />
          <button className="btn btn-primary ms-2" onClick={searchPlayer}>
            Search
          </button>
        </div>

        {/* Error */}
        {error && <p className="text-white text-center">{error}</p>}

        {/* Player Info */}
        {playerInfo && (
          <div
            className="card mx-auto shadow mt-6"
            style={{ maxWidth: "400px" }}
            data-aos="zoom-in-up"
          >
            {playerInfo.image && (
              <img
                src={playerInfo.image}
                className="card-img-center"
                alt={playerInfo.title}
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{playerInfo.title}</h5>
              <p className="card-text">{playerInfo.description}</p>
            </div>
          </div>
        )}

        {/* Fallback message */}
        {!playerInfo && !error && (
          <p className="text-center text-white">Search any player to see details!</p>
        )}
      </div>
    </section>
  );
};

export default Players;
