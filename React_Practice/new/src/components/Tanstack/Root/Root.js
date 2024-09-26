import React from "react";
import RQdata from "../components/RQdata";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
function Root() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/RQdata" element={<RQdata />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default Root;
