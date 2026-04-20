function ResultCard({ eligible, coverage, copay }) {
  const badgeClass = eligible
    ? "border-emerald-200 bg-emerald-100 text-emerald-700"
    : "border-rose-200 bg-rose-100 text-rose-700";

  const coverageItems = Array.isArray(coverage)
    ? coverage
    : coverage
      ? [coverage]
      : ["No coverage details available."];

  return (
    <section className="animate-fade-in rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Eligibility Result</h2>
        <span
          className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1 text-xs font-bold ${badgeClass}`}
        >
          {eligible ? (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.42l-7.25 7.25a1 1 0 01-1.415 0L3.29 9.21a1 1 0 111.414-1.42l4.042 4.043 6.543-6.544a1 1 0 011.415 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {eligible ? "Eligible" : "Not Eligible"}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1.6fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-800">Coverage Details</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {coverageItems.map((item, index) => (
              <li key={`${item}-${index}`} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-sky-200 bg-sky-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">Copay</p>
          <p className="mt-2 text-3xl font-bold leading-none text-sky-900">
            {copay == null ? "N/A" : `$${copay}`}
          </p>
        </section>
      </div>
    </section>
  );
}

export default ResultCard;
