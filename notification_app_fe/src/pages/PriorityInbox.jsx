import React, { useState, useEffect } from "react";
import { getNotifications } from "../api";

// priority order: placement > result > event
const priorityOrder = { placement: 1, result: 2, event: 3 };

function PriorityInbox() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);

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

  // sort by priority first, then by newest timestamp
  const sorted = [...notifications].sort((a, b) => {
    const pA = priorityOrder[a.type] || 99;
    const pB = priorityOrder[b.type] || 99;
    if (pA !== pB) return pA - pB;
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  const display = sorted.slice(0, limit);

  if (loading) return <p className="loading">Loading notifications...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h2>Priority Inbox</h2>
      <div className="filter-bar">
        <label>Show: </label>
        <select value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
          <option value={10}>Top 10</option>
          <option value={15}>Top 15</option>
          <option value={20}>Top 20</option>
        </select>
      </div>

      {display.length === 0 && <p>No notifications found.</p>}

      {display.map((notif, index) => (
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

export default PriorityInbox;
