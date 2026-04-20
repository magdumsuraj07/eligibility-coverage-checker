function Loader({ message = "Checking eligibility..." }) {
  return (
    <div className="rounded-2xl border border-sky-200 bg-sky-50 p-6 text-sm text-sky-700">
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <span
          className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-sky-600 border-t-transparent"
          aria-hidden="true"
        />
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
}

export default Loader;
