import { useCallback } from "react";
import { changeCheck, changeVisible } from "../store/profile/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

const Profile = () => {
	const { showName, name, checkMe } = useSelector((state) => state);
	const dispatch = useDispatch();

	const setShowName = useCallback(() => {
		dispatch(changeVisible);
	}, [dispatch]);

	const setCheckMe = useCallback(() => {
		dispatch(changeCheck);
	}, [dispatch]);

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
		</div>
	);
};

export default Profile;
