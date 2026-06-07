import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Notifications from "./pages/Notifications";
import PriorityInbox from "./pages/PriorityInbox";
import "./App.css";

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <h2>Notification System</h2>
        <div className="nav-links">
          <Link to="/">Notifications</Link>
          <Link to="/priority">Priority Inbox</Link>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Notifications />} />
          <Route path="/priority" element={<PriorityInbox />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
