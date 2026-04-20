const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const eligibilityRouter = require("./routes/eligibility");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/check-eligibility", eligibilityRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const frontendDistPath = path.join(__dirname, "../../frontend/dist");

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
