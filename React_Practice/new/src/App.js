import logo from "./logo.svg";
import "./App.css";
import InputField from "./InputField";
import { useRef, useState } from "react";
import Asyncdatas from "./components/Asyncdatas";
import Home from "./components/Tanstack/components/Home";
import Parent from "./components/hooks/Parent";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UseMemohook from "./components/hooks/UseMemohook";
// import { QueryClient } from "@tanstack/react-query";
// import AnimationAndTransition from "./components/css_Conepts/AnimationAndTransition";

function App() {
  return (
    <BrowserRouter> {/* Move BrowserRouter to the top */}
      <div  style={{display:"flex", justifyContent:"space-around"}} className="App">
        {/* Add links within BrowserRouter */}
        <Link to="/">Go Home</Link>
        <Link to="/UseMemohook">Child</Link> {/* Add leading slash */}
      </div>
      <Routes>
        {/* Route to Parent */}
        <Route path="/" element={<Parent />} />

        {/* Nested Route to Child */}
        <Route path="/UseMemohook" element={<UseMemohook />} /> {/* Add leading slash */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
