const form = document.getElementById("eligibility-form");
const resultSection = document.getElementById("result");

function renderResult(data) {
  const eligible = data.eligible ? "Eligible" : "Not Eligible";
  const badgeClass = data.eligible ? "ok" : "no";
  const copayText = data.copayEstimate === null ? "N/A" : `$${data.copayEstimate}`;

  resultSection.innerHTML = `
    <h2>Eligibility Result</h2>
    <p><span class="badge ${badgeClass}">${eligible}</span></p>
    <p><strong>Coverage Status:</strong> ${data.coverageStatus}</p>
    <p><strong>Coverage Details:</strong> ${data.coverageDetails}</p>
    <p><strong>Copay Estimate:</strong> ${copayText}</p>
  `;
  resultSection.classList.remove("hidden");
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const payload = {
    patientId: document.getElementById("patientId").value.trim(),
    insuranceProvider: document.getElementById("insuranceProvider").value,
    serviceType: document.getElementById("serviceType").value
  };

  try {
    const response = await fetch("/check-eligibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    renderResult(data);
  } catch (error) {
    renderResult({
      eligible: false,
      coverageStatus: "Error",
      coverageDetails: "Unable to reach eligibility service",
      copayEstimate: null
    });
  }
});
