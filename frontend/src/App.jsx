import { useState } from "react";
import EligibilityForm from "./components/EligibilityForm";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import ResultCard from "./components/ResultCard";
import { checkEligibility } from "./services/eligibilityApi";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSubmit(nextFormData) {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await checkEligibility(nextFormData);
      setResult(data);
    } catch (requestError) {
      setError(requestError.message || "Unable to reach eligibility service.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50 to-cyan-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Insurance Eligibility Checker
          </h1>
          <p className="text-slate-600">
            Check coverage status, service eligibility, and copay estimate.
          </p>
        </header>

        <EligibilityForm
          onSubmit={handleSubmit}
          loading={loading}
        />

        {loading ? <Loader message="Checking eligibility..." /> : null}
        {!loading && error ? (
          <ErrorMessage message={error} onDismiss={() => setError("")} />
        ) : null}
        {!loading && result ? (
          <ResultCard
            eligible={result.eligible}
            coverage={[`Status: ${result.coverageStatus}`, result.coverageDetails]}
            copay={result.copayEstimate}
          />
        ) : null}
      </div>
    </main>
  );
}

export default App;
