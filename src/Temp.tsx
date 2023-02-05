import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import { AroundYou, Discover, Search, TopArtists, TopCharts } from "./pages";
// import Signup from "./pages/Signup";
//import Appp from "./pages/appp";
import Signup from "./pages/Signup";

const Authenticated = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/app" element={<App />}>
        <Route path="" element={<Discover />} />
        <Route path="top-artists" element={<TopArtists />} />
        <Route path="top-charts" element={<TopCharts />} />
        <Route path="around-you" element={<AroundYou />} />
        <Route path="search/:searchTerm" element={<Search />} />
        <Route path="auth" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Authenticated;
