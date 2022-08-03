import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Login, Home } from "./templates";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
