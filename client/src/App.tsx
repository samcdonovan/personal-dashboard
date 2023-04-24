import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Photos from "./pages/Photos";
import Tasks from "./pages/Tasks";
import Sports from "./pages/Sports";
import News from "./pages/News";

function App() {
  return (
    <div className="app">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/photos" element={<Photos />} />
          <Route path="/dashboard/tasks" element={<Tasks />} />
          <Route path="/dashboard/sports" element={<Sports />} />
          <Route path="/dashboard/news" element={<News />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
