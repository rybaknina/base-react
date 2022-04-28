import "./App.scss";
import { useState } from "react";
import { blue, indigo, orange, teal } from "@mui/material/colors";
import { createTheme, Switch, ThemeProvider } from "@mui/material";
import Router from "./router/Router";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/AuthProvider";

const App = () => {
	const [darkState, setDarkState] = useState(false);
	const theme = createTheme({
		palette: {
			type: darkState ? "dark" : "light",
			primary: {
				main: darkState ? blue[900] : teal[200],
			},
			secondary: {
				main: darkState ? indigo[900] : teal[900],
			},
		},
		status: {
			danger: orange[500],
		},
	});
	const handleThemeChange = () => {
		setDarkState(!darkState);
	};
	return (
		<ThemeProvider theme={theme}>
			<Switch checked={darkState} onChange={handleThemeChange} size="medium" />
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ThemeProvider>
	);
};

export default App;
