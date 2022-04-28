import { useCallback, useEffect, useRef, useState } from "react";
import { changeCheck, changeVisible } from "../store/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControlLabel, TextField, Typography, useTheme } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import getProfile from "../store/profile/selectors";
import { getProfileNameWithFB, updateNameWithFb } from "../middlewares/middleware";
import useAuth from "../hooks/AuthProvider";

const Profile = () => {
	let auth = useAuth();
	const theme = useTheme();
	const { showName, name, checkMe } = useSelector(getProfile);
	const [value, setValue] = useState("");
	const textInput = useRef();
	const dispatch = useDispatch();

	const userId = auth.user.uid;
	console.log(userId);

	const setShowName = useCallback(() => {
		dispatch(changeVisible);
	}, [dispatch]);

	const setCheckMe = useCallback(() => {
		dispatch(changeCheck);
	}, [dispatch]);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	const saveName = () => {
		dispatch(updateNameWithFb(userId, value));
		setValue("");
	};

	const handleKeypress = (event) => {
		if (event.key === "Enter") {
			saveName();
		}
	};

	useEffect(() => {
		dispatch(getProfileNameWithFB(userId));
	}, [userId]);

	return (
		<div style={{ textAlign: "center" }}>
			<Typography variant="h4">Profile</Typography>
			<Button onClick={setShowName}>Show Name</Button>
			<blockquote>
				{showName && (
					<Typography variant="body1" style={{ color: "#4287f5" }}>
						{name}
					</Typography>
				)}
			</blockquote>
			<FormControlLabel
				control={<Checkbox checked={checkMe} onChange={setCheckMe} />}
				label="Check me"
			/>
			<br />
			<br />
			<TextField
				label="Name"
				inputRef={textInput}
				autoFocus={true}
				type="text"
				placeholder={"Введите Ваше имя"}
				value={value}
				onChange={handleChange}
				onKeyPress={handleKeypress}
				variant="outlined"
				style={{ marginTop: "5px", color: theme.palette.primary.dark }}
			/>
			<Button
				style={{
					backgroundColor: theme.palette.primary.dark,
					marginTop: "5px",
					padding: "15px",
				}}
				onClick={saveName}
				color="primary"
				aria-label="save"
			>
				<SaveIcon />
			</Button>
		</div>
	);
};

export default Profile;
