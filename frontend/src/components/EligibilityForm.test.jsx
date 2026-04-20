import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EligibilityForm from "./EligibilityForm";

describe("EligibilityForm", () => {
  test("renders all fields", () => {
    render(<EligibilityForm onSubmit={vi.fn()} loading={false} />);

    expect(screen.getByLabelText(/Patient ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Insurance Provider/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Service Type/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Check Eligibility/i })).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", () => {
    render(<EligibilityForm onSubmit={vi.fn()} loading={false} />);

    const submitButton = screen.getByRole("button", { name: /Check Eligibility/i });
    fireEvent.submit(submitButton.closest("form"));

    expect(screen.getByText("Patient ID is required.")).toBeInTheDocument();
    expect(screen.getByText("Insurance provider is required.")).toBeInTheDocument();
    expect(screen.getByText("Service type is required.")).toBeInTheDocument();
  });

  test("calls onSubmit with correct data", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(<EligibilityForm onSubmit={onSubmit} loading={false} />);

    await user.type(screen.getByLabelText(/Patient ID/i), "  IN1001  ");
    await user.selectOptions(screen.getByLabelText(/Insurance Provider/i), "Star Health");
    await user.selectOptions(screen.getByLabelText(/Service Type/i), "Consultation");
    await user.click(screen.getByRole("button", { name: /Check Eligibility/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      patientId: "IN1001",
      insuranceProvider: "Star Health",
      serviceType: "Consultation"
    });
  });
});
