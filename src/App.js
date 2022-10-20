import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/css/App.css"

import Header from './components/Header';
import Navbar from "./components/Navbar"
import Home from './components/Home';
import Closet from "./components/Closet";
import Looks from "./components/Looks";
import Calendar from "./components/Calendar";


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="closet" element={<Closet />} />
            <Route path="looks" element={<Looks />} />
            <Route path="calendar" element={<Calendar />} />
            {/* <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
