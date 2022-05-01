import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders chats react link", () => {
	render(<App />, { wrapper: MemoryRouter });
	const linkElement = screen.getByText(/chats/i);
	expect(linkElement).toBeInTheDocument();
});
