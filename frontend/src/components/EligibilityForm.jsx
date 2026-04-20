import { useMemo, useState } from "react";
import { PROVIDERS, SERVICE_TYPES } from "../constants/options";

const initialFormData = {
  patientId: "",
  insuranceProvider: "",
  serviceType: ""
};

function validateForm(values) {
  const errors = {};

  if (!values.patientId.trim()) {
    errors.patientId = "Patient ID is required.";
  }
  if (!values.insuranceProvider) {
    errors.insuranceProvider = "Insurance provider is required.";
  }
  if (!values.serviceType) {
    errors.serviceType = "Service type is required.";
  }

  return errors;
}

function EligibilityForm({ onSubmit, onFormChange, loading }) {
  const [formData, setFormData] = useState(initialFormData);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => validateForm(formData), [formData]);
  const isFormValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;
    const nextFormData = {
      ...formData,
      [name]: value
    };

    setFormData(nextFormData);
    if (onFormChange) {
      onFormChange(nextFormData);
    }
  }

  function handleBlur(event) {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setTouched({
      patientId: true,
      insuranceProvider: true,
      serviceType: true
    });

    if (!isFormValid || loading) {
      return;
    }

    onSubmit({
      ...formData,
      patientId: formData.patientId.trim()
    });
  }

  function getInputClasses(fieldName) {
    const hasError = touched[fieldName] && errors[fieldName];
    return `rounded-lg border px-3 py-2 text-slate-900 outline-none transition focus:ring-2 ${
      hasError
        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-200"
        : "border-slate-300 focus:border-sky-500 focus:ring-sky-200"
    }`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50 sm:p-6"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Patient ID</span>
          <input
            type="text"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. IN1001"
            required
            className={getInputClasses("patientId")}
          />
          {touched.patientId && errors.patientId ? (
            <p className="text-xs font-medium text-rose-600">{errors.patientId}</p>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Insurance Provider</span>
          <select
            name="insuranceProvider"
            value={formData.insuranceProvider}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={getInputClasses("insuranceProvider")}
          >
            <option value="">Select provider</option>
            {PROVIDERS.map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
          {touched.insuranceProvider && errors.insuranceProvider ? (
            <p className="text-xs font-medium text-rose-600">{errors.insuranceProvider}</p>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Service Type</span>
          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            className={getInputClasses("serviceType")}
          >
            <option value="">Select service</option>
            {SERVICE_TYPES.map((serviceType) => (
              <option key={serviceType} value={serviceType}>
                {serviceType}
              </option>
            ))}
          </select>
          <p className="text-xs text-slate-500">
            Select the type of service to check coverage.
          </p>
          {touched.serviceType && errors.serviceType ? (
            <p className="text-xs font-medium text-rose-600">{errors.serviceType}</p>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 font-semibold text-white transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Checking..." : "Check Eligibility"}
        </button>
      </div>
    </form>
  );
}

export default EligibilityForm;
