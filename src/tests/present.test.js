import { render } from "@testing-library/react";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import { MemoryRouter } from "react-router-dom";

describe("present component tests", () => {
	it("matches snapshot with home", () => {
		const component = render(<Home />);
		expect(component).toMatchSnapshot();
	});

	it("matches snapshot with not found", () => {
		const component = render(<NotFound />, { wrapper: MemoryRouter });
		expect(component).toMatchSnapshot();
	});
});
