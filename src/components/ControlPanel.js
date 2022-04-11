import Grid from "@mui/material/Grid";
import { Fab, TextField, useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { AUTHOR } from "../constants/common";
import { useParams } from "react-router-dom";

const ControlPanel = ({ addMessage }) => {
	const theme = useTheme();
	let { chatId } = useParams();
	const [messageText, setMessageText] = useState("");
	const textInput = useRef();

	useEffect(() => {
		textInput.current?.focus();
	}, []);

	const handleClick = () => {
		if (messageText !== "") {
			const newMessage = {
				id: _uniqueId("msg_"),
				author: AUTHOR.me,
				text: messageText,
			};
			addMessage(chatId, newMessage);
			setMessageText("");
		}
	};
	const handleChange = (event) => {
		setMessageText(event.target.value);
	};

	const handleKeypress = (event) => {
		if (event.key === "Enter") {
			handleClick();
		}
	};
	return (
		<div style={{ backgroundColor: theme.palette.primary.light }}>
			<Grid container style={{ padding: "20px 15px" }}>
				<Grid item xs={11}>
					<TextField
						inputRef={textInput}
						autoFocus={true}
						type="text"
						placeholder={"текст сообщения"}
						value={messageText}
						onChange={handleChange}
						onKeyPress={handleKeypress}
						variant="outlined"
						style={{ marginRight: "10px", color: theme.palette.primary.dark }}
						fullWidth
					/>
				</Grid>
				<Grid item xs={1} align="right">
					<Fab
						style={{ backgroundColor: theme.palette.primary.dark }}
						onClick={handleClick}
						color="primary"
						aria-label="add"
					>
						<Send />
					</Fab>
				</Grid>
			</Grid>
		</div>
	);
};

export default ControlPanel;
