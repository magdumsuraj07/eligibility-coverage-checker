import { useState } from "react";

const providers = [
  "Star Health",
  "Niva Bupa",
  "HDFC ERGO",
  "ICICI Lombard",
  "Care Health",
  "SBI General"
];

const serviceTypes = [
  "Consultation",
  "Lab Test",
  "MRI Scan",
  "CT Scan",
  "X-Ray",
  "Surgery",
  "Dental",
  "Maternity",
  "Ayurveda"
];

const sampleCases = [
  { label: "Eligible", patientId: "IN1001", insuranceProvider: "Star Health", serviceType: "Consultation" },
  { label: "Inactive", patientId: "IN1004", insuranceProvider: "ICICI Lombard", serviceType: "Consultation" },
  { label: "Not Covered", patientId: "IN1002", insuranceProvider: "Niva Bupa", serviceType: "MRI Scan" }
];

const initialForm = {
  patientId: "",
  insuranceProvider: "",
  serviceType: ""
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function loadSample(sample) {
    setForm({
      patientId: sample.patientId,
      insuranceProvider: sample.insuranceProvider,
      serviceType: sample.serviceType
    });
    setResult(null);
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to check eligibility");
      }

      setResult(data);
    } catch (submitError) {
      setResult(null);
      setError(submitError.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  const statusTone = result?.eligible ? "success" : "danger";

  return (
    <div className="page-shell">
      <main className="app-layout">
        <section className="hero-panel">
          <p className="eyebrow">Healthcare Demo Workflow</p>
          <h1>Eligibility & Coverage Checker</h1>
          <p className="hero-copy">
            Enter a patient ID, insurance provider, and service type to validate eligibility,
            coverage details, and a mock copay in one step.
          </p>

          <div className="sample-strip">
            {sampleCases.map((sample) => (
              <button
                key={sample.label}
                type="button"
                className="sample-chip"
                onClick={() => loadSample(sample)}
              >
                Try {sample.label}
              </button>
            ))}
          </div>
        </section>

        <section className="card form-card">
          <div className="section-heading">
            <h2>Check eligibility</h2>
            <p>Use mock patient and insurance data for quick demo scenarios.</p>
          </div>

          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Patient ID
              <input
                name="patientId"
                value={form.patientId}
                onChange={updateField}
                placeholder="e.g. IN1001"
                required
              />
            </label>

            <label>
              Insurance Provider
              <select
                name="insuranceProvider"
                value={form.insuranceProvider}
                onChange={updateField}
                required
              >
                <option value="">Select provider</option>
                {providers.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Service Type
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={updateField}
                required
              >
                <option value="">Select service</option>
                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </label>

            <button className="primary-button" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check Eligibility"}
            </button>
          </form>

          {error ? <div className="message-banner error-banner">{error}</div> : null}
        </section>

        <section className="card result-card">
          <div className="section-heading">
            <h2>Response</h2>
            <p>Eligibility output from the Node.js API.</p>
          </div>

          {result ? (
            <>
              <div className={`status-pill ${statusTone}`}>
                {result.eligible ? "Eligible" : "Not Eligible"}
              </div>

              <div className="result-grid">
                <article>
                  <span className="meta-label">Coverage status</span>
                  <strong>{result.coverageStatus}</strong>
                </article>
                <article>
                  <span className="meta-label">Patient</span>
                  <strong>{result.patientName || "Unknown Patient"}</strong>
                </article>
                <article>
                  <span className="meta-label">Requested service</span>
                  <strong>{result.serviceType}</strong>
                </article>
                <article>
                  <span className="meta-label">Copay estimate</span>
                  <strong>{result.copayEstimate === null ? "N/A" : `INR ${result.copayEstimate}`}</strong>
                </article>
              </div>

              <div className="detail-block">
                <span className="meta-label">Coverage details</span>
                <p>{result.coverageDetails}</p>
              </div>

              <div className="detail-block">
                <span className="meta-label">Covered services</span>
                <div className="covered-list">
                  {result.coveredServices?.length ? (
                    result.coveredServices.map((service) => (
                      <span key={service} className="covered-chip">
                        {service}
                      </span>
                    ))
                  ) : (
                    <span className="covered-chip muted">No covered services returned</span>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              Submit the form to see eligibility, coverage details, and copay information.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
