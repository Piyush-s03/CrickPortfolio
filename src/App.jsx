// src/App.jsx

import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import Grounds from "./pages/Grounds";
import Achievements from "./pages/Achievements";
import Shop from "./pages/Shop";
import Club from "./pages/Club";
import LiveScore from "./pages/LiveScore";
import Contact from "./pages/Contact";
import Rules from "./pages/Rules";
import History from "./pages/History";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VisitorsLog from "./pages/VisitorsLog";

import "./App.css";

const App = () => {

  useEffect(() => {

    const visitData = {
      visitTime: new Date().toLocaleString(),
      userAgent: navigator.userAgent,
      pageVisited: window.location.pathname,
    };

    const previousVisits =
      JSON.parse(localStorage.getItem("userVisits")) || [];

    previousVisits.push(visitData);

    localStorage.setItem(
      "userVisits",
      JSON.stringify(previousVisits)
    );

  }, []);

  return (

    <>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/players"
          element={<Players />}
        />

        <Route
          path="/grounds"
          element={<Grounds />}
        />

        <Route
          path="/achievements"
          element={<Achievements />}
        />

        <Route
          path="/club"
          element={<Club />}
        />

        <Route
          path="/livescore"
          element={<Livescore />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/rules"
          element={<Rules />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/visitorslog"
          element={<VisitorsLog />}
        />

      </Routes>

      <Footer />

    </>

  );

};

export default App;