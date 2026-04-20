const express = require("express");
const cors = require("cors");
const path = require("path");
const eligibilityRouter = require("./routes/eligibility");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/check-eligibility", eligibilityRouter);

const frontendPath = path.join(__dirname, "../../frontend/public");
app.use(express.static(frontendPath));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
