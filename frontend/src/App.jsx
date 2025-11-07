import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Bilancio from "./components/Bilancio/Bilancio";
import Contabilita from "./components/Contabilita";
import HomePage from "./components/HomePage";
import ViewBilancio from "./components/Bilancio/ViewBilancio";
import Anagrafica from "./components/Anagrafica/Anagrafica";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar content={<HomePage />} />} />
        <Route
          path="/anagrafiche"
          element={<Navbar content={<Anagrafica />} />}
        />
        <Route
          path="/contabilita/scritture"
          element={<Navbar content={<Contabilita />} />}
        />
        <Route
          path="/contabilita/bilancio"
          element={<Navbar content={<Bilancio />} />}
        />
        <Route
          path="/contabilita/nuovo_bilancio"
          element={<Navbar content={<ViewBilancio />} />}
        />
      </Routes>
    </Router>
  );
}
