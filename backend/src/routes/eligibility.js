const express = require("express");
const { checkEligibility } = require("../services/eligibilityService");

const router = express.Router();

router.post("/", (req, res) => {
  const { patientId, insuranceProvider, serviceType } = req.body;

  if (!patientId || !insuranceProvider || !serviceType) {
    return res.status(400).json({
      eligible: false,
      message: "patientId, insuranceProvider and serviceType are required"
    });
  }

  const result = checkEligibility({ patientId, insuranceProvider, serviceType });
  return res.status(200).json(result);
});

module.exports = router;
