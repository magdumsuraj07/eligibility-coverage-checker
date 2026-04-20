export async function checkEligibility(payload) {
  try {
    const response = await fetch("/check-eligibility", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        patientId: payload.patientId,
        insuranceProvider: payload.insuranceProvider,
        serviceType: payload.serviceType
      })
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const responseBody = isJson ? await response.json() : null;

    if (!response.ok) {
      throw new Error(
        responseBody?.message ||
          "We could not complete the eligibility check. Please review your inputs and try again."
      );
    }

    return responseBody;
  } catch (error) {
    if (error.name === "TypeError") {
      throw new Error(
        "Unable to connect to the eligibility service. Please check your network and try again."
      );
    }

    throw error;
  }
}
