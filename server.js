const express = require("express");
const Mercury = require("@postlight/mercury-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/parser", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Missing URL parameter" });

  try {
    const response = await fetch(url);
    const html = await response.text();
    const result = await Mercury.parse(url, { html });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to parse article", details: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Mercury Parser is running.");
});

app.listen(PORT, () => {
  console.log(`Mercury Parser listening on port ${PORT}`);
});
