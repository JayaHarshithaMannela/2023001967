const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { API_URL, TOKEN } = require("./config");

const app = express();
const PORT = 5000;

app.use(cors());

// GET /api/notifications - fetch notifications from external API
app.get("/api/notifications", async (req, res) => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.log("Error fetching notifications:", error.message);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
