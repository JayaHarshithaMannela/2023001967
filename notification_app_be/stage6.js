const notifications = [
  {
    id: "1",
    type: "Result",
    message: "mid-sem",
    timestamp: "2026-04-22 17:51:30"
  },
  {
    id: "2",
    type: "Placement",
    message: "CSX Corporation hiring",
    timestamp: "2026-04-22 17:51:18"
  },
  {
    id: "3",
    type: "Event",
    message: "farewell",
    timestamp: "2026-04-22 17:51:06"
  },
  {
    id: "4",
    type: "Placement",
    message: "AMD hiring",
    timestamp: "2026-04-22 17:49:42"
  }
];

const priority = {
  Placement: 3,
  Result: 2,
  Event: 1
};

const topNotifications = notifications
  .sort((a, b) => {
    if (priority[b.type] !== priority[a.type]) {
      return priority[b.type] - priority[a.type];
    }
    return new Date(b.timestamp) - new Date(a.timestamp);
  })
  .slice(0, 10);

console.log("Top 10 Priority Notifications");
console.table(topNotifications);