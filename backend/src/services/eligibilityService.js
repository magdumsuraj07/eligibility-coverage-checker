const patients = require("../../data/patients.json");
const coverageRules = require("../../data/coverageRules.json");

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function checkEligibility({ patientId, insuranceProvider, serviceType }) {
  const normalizedProvider = normalize(insuranceProvider);
  const normalizedService = normalize(serviceType);

  const patient = patients.find((item) => normalize(item.patientId) === normalize(patientId));

  if (!patient) {
    return {
      eligible: false,
      coverageStatus: "Not Found",
      coverageDetails: "Patient does not exist",
      copayEstimate: null
    };
  }

  if (normalize(patient.insuranceProvider) !== normalizedProvider) {
    return {
      eligible: false,
      coverageStatus: "Mismatch",
      coverageDetails: "Insurance provider does not match patient record",
      copayEstimate: null
    };
  }

  if (!patient.active) {
    return {
      eligible: false,
      coverageStatus: "Inactive",
      coverageDetails: "Insurance is inactive",
      copayEstimate: null
    };
  }

  const providerRules = coverageRules.providers[patient.insuranceProvider];
  if (!providerRules) {
    return {
      eligible: false,
      coverageStatus: "Active",
      coverageDetails: "No coverage rules found for provider",
      copayEstimate: null
    };
  }

  const matchedServiceKey = Object.keys(providerRules.services).find(
    (key) => normalize(key) === normalizedService
  );

  if (!matchedServiceKey) {
    return {
      eligible: false,
      coverageStatus: "Active",
      coverageDetails: "Service not listed under provider coverage rules",
      copayEstimate: null
    };
  }

  const serviceRule = providerRules.services[matchedServiceKey];

  if (!serviceRule.covered) {
    return {
      eligible: false,
      coverageStatus: "Active",
      coverageDetails: `${matchedServiceKey} is not covered for this plan`,
      copayEstimate: null
    };
  }

  return {
    eligible: true,
    coverageStatus: "Active",
    coverageDetails: `${matchedServiceKey} is covered`,
    copayEstimate: serviceRule.copay
  };
}

module.exports = { checkEligibility };
