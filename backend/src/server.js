const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const eligibilityRouter = require("./routes/eligibility");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/check-eligibility", eligibilityRouter);

const frontendBuildPath = path.join(__dirname, "../../frontend/dist");
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get("/", (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
