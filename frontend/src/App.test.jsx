import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { checkEligibility } from "./services/eligibilityApi";

vi.mock("./services/eligibilityApi", () => ({
  checkEligibility: vi.fn()
}));

async function fillAndSubmitForm() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Patient ID/i), "IN1001");
  await user.selectOptions(screen.getByLabelText(/Insurance Provider/i), "Star Health");
  await user.selectOptions(screen.getByLabelText(/Service Type/i), "Consultation");
  await user.click(screen.getByRole("button", { name: /Check Eligibility/i }));
}

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("shows loader during API call", async () => {
    let resolveRequest;
    checkEligibility.mockReturnValueOnce(
      new Promise((resolve) => {
        resolveRequest = resolve;
      })
    );

    render(<App />);
    await fillAndSubmitForm();

    expect(screen.getByText("Checking eligibility...")).toBeInTheDocument();

    resolveRequest({
      eligible: true,
      coverageStatus: "Active",
      coverageDetails: "Consultation is covered",
      copayEstimate: 30
    });

    await waitFor(() =>
      expect(screen.queryByText("Checking eligibility...")).not.toBeInTheDocument()
    );
  });

  test("displays result after success", async () => {
    checkEligibility.mockResolvedValueOnce({
      eligible: true,
      coverageStatus: "Active",
      coverageDetails: "Consultation is covered",
      copayEstimate: 20
    });

    render(<App />);
    await fillAndSubmitForm();

    expect(await screen.findByText("Eligibility Result")).toBeInTheDocument();
    expect(screen.getByText("Eligible")).toBeInTheDocument();
    expect(screen.getByText("Status: Active")).toBeInTheDocument();
    expect(screen.getByText("Consultation is covered")).toBeInTheDocument();
    expect(screen.getByText("$20")).toBeInTheDocument();
  });

  test("displays error on API failure", async () => {
    checkEligibility.mockRejectedValueOnce(new Error("Service unavailable"));

    render(<App />);
    await fillAndSubmitForm();

    expect(await screen.findByText("Service unavailable")).toBeInTheDocument();
  });
});
