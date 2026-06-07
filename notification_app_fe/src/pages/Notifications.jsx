import React, { useState, useEffect } from "react";
import { getNotifications } from "../api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      setError("Failed to fetch notifications");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "All"
    ? notifications
    : notifications.filter((n) => n.type === filter);

  if (loading) return <p className="loading">Loading notifications...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Notifications</h2>
      <div className="filter-bar">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="placement">Placement</option>
          <option value="result">Result</option>
          <option value="event">Event</option>
        </select>
      </div>

      {filtered.length === 0 && <p>No notifications found.</p>}

      {filtered.map((notif, index) => (
        <div
          key={index}
          className={`card ${notif.read === false ? "unread" : ""}`}
        >
          <div className="card-header">
            <span className="type-badge">{notif.type}</span>
            <span className="timestamp">
              {new Date(notif.timestamp).toLocaleString()}
            </span>
          </div>
          <p className="message">{notif.message}</p>
        </div>
      ))}
    </div>
  );
}

export default Notifications;
