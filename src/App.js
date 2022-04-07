import "./App.scss";
import MainApp from "./components/MainApp";
import { useState } from "react";
import { blue, indigo, orange, teal } from "@mui/material/colors";
import { createTheme, Switch, ThemeProvider } from "@mui/material";

function App() {
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
			<MainApp />
		</ThemeProvider>
	);
}

export default App;
