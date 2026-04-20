import { render, screen } from "@testing-library/react";
import ResultCard from "./ResultCard";

describe("ResultCard", () => {
  test("displays correct eligibility status", () => {
    const { rerender } = render(
      <ResultCard eligible={true} coverage={["Status: Active"]} copay={25} />
    );
    expect(screen.getByText("Eligible")).toBeInTheDocument();

    rerender(<ResultCard eligible={false} coverage={["Status: Inactive"]} copay={null} />);
    expect(screen.getByText("Not Eligible")).toBeInTheDocument();
  });

  test("shows coverage details", () => {
    render(
      <ResultCard
        eligible={true}
        coverage={["Status: Active", "Consultation is covered"]}
        copay={20}
      />
    );

    expect(screen.getByText("Status: Active")).toBeInTheDocument();
    expect(screen.getByText("Consultation is covered")).toBeInTheDocument();
  });

  test("shows copay", () => {
    render(<ResultCard eligible={true} coverage="Covered" copay={15} />);
    expect(screen.getByText("$15")).toBeInTheDocument();
  });
});
