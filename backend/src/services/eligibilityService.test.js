const assert = require("node:assert/strict");
const { checkEligibility } = require("./eligibilityService");

function runTest(name, testFn) {
  try {
    testFn();
    console.log(`PASS: ${name}`);
  } catch (error) {
    console.error(`FAIL: ${name}`);
    console.error(error);
    process.exitCode = 1;
  }
}

runTest("returns eligible response for active patient with covered service", () => {
  const result = checkEligibility({
    patientId: "IN1001",
    insuranceProvider: "Star Health",
    serviceType: "Consultation"
  });

  assert.equal(result.eligible, true);
  assert.equal(result.coverageStatus, "Active");
  assert.equal(result.copayEstimate, 300);
  assert.ok(result.coveredServices.includes("Consultation"));
});

runTest("returns inactive when patient insurance is not active", () => {
  const result = checkEligibility({
    patientId: "IN1004",
    insuranceProvider: "ICICI Lombard",
    serviceType: "Consultation"
  });

  assert.equal(result.eligible, false);
  assert.equal(result.coverageStatus, "Inactive");
  assert.equal(result.copayEstimate, null);
});

runTest("returns mismatch when provider does not match patient record", () => {
  const result = checkEligibility({
    patientId: "IN1002",
    insuranceProvider: "Star Health",
    serviceType: "Lab Test"
  });

  assert.equal(result.eligible, false);
  assert.equal(result.coverageStatus, "Mismatch");
});
