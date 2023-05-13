import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Photos from "./pages/Gallery";
import Tasks from "./pages/Tasks";
import Sports from "./pages/Sports";
import News from "./pages/News";
import Protected from "./components/Protected";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useMemo(() => {
    if (localStorage.getItem('credentials')) {
      setIsLoggedIn(true);
    }
  }, [])

  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          {/* routes for all pages on the dashboard site */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <Protected isLoggedIn={isLoggedIn}>
              <Dashboard />
            </Protected>} />
          <Route path="/dashboard/gallery" element={
            <Protected isLoggedIn={isLoggedIn}>
              <Photos />
            </Protected>} />
          <Route path="/dashboard/tasks" element={
            <Protected isLoggedIn={isLoggedIn}>
              <Tasks />
            </Protected>} />
          <Route path="/dashboard/sports" element={
            <Protected isLoggedIn={isLoggedIn}>
              <Sports />
            </Protected>} />
          <Route path="/dashboard/news" element={
            <Protected isLoggedIn={isLoggedIn}>
              <News />
            </Protected>} />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
