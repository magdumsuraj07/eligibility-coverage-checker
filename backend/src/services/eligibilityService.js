const patients = require("../../data/patients.json");
const coverageRules = require("../../data/coverageRules.json");

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function buildBaseResponse(patient, insuranceProvider, serviceType) {
  return {
    patientId: patient ? patient.patientId : null,
    patientName: patient ? patient.name : null,
    insuranceProvider,
    serviceType,
    coveredServices: [],
    eligible: false,
    coverageStatus: "Unknown",
    coverageDetails: "",
    copayEstimate: null
  };
}

function checkEligibility({ patientId, insuranceProvider, serviceType }) {
  const normalizedProvider = normalize(insuranceProvider);
  const normalizedService = normalize(serviceType);

  const patient = patients.find((item) => normalize(item.patientId) === normalize(patientId));

  if (!patient) {
    return {
      ...buildBaseResponse(null, insuranceProvider, serviceType),
      coverageStatus: "Not Found",
      coverageDetails: "Patient does not exist"
    };
  }

  const baseResponse = buildBaseResponse(patient, insuranceProvider, serviceType);

  if (normalize(patient.insuranceProvider) !== normalizedProvider) {
    return {
      ...baseResponse,
      coverageStatus: "Mismatch",
      coverageDetails: "Insurance provider does not match patient record"
    };
  }

  if (!patient.active) {
    return {
      ...baseResponse,
      coverageStatus: "Inactive",
      coverageDetails: "Insurance is inactive"
    };
  }

  const providerRules = coverageRules.providers[patient.insuranceProvider];
  if (!providerRules) {
    return {
      ...baseResponse,
      coverageStatus: "Active",
      coverageDetails: "No coverage rules found for provider"
    };
  }

  const coveredServices = Object.entries(providerRules.services)
    .filter(([, rule]) => rule.covered)
    .map(([service]) => service);

  const matchedServiceKey = Object.keys(providerRules.services).find(
    (key) => normalize(key) === normalizedService
  );

  if (!matchedServiceKey) {
    return {
      ...baseResponse,
      coveredServices,
      coverageStatus: "Active",
      coverageDetails: "Service not listed under provider coverage rules"
    };
  }

  const serviceRule = providerRules.services[matchedServiceKey];

  if (!serviceRule.covered) {
    return {
      ...baseResponse,
      coveredServices,
      coverageStatus: "Active",
      coverageDetails: `${matchedServiceKey} is not covered for this plan`
    };
  }

  return {
    ...baseResponse,
    coveredServices,
    eligible: true,
    coverageStatus: "Active",
    coverageDetails: `${matchedServiceKey} is covered`,
    copayEstimate: serviceRule.copay
  };
}

module.exports = { checkEligibility };
