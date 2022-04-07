import { useEffect, useRef, useState } from "react";
import { Fab, TextField, useTheme } from "@mui/material";
import ChatList from "./ChatList";
import Grid from "@mui/material/Grid";
import { Send } from "@mui/icons-material";
import { AUTHOR, BOT_ANSWER, TIME_IN_SECONDS } from "../constants/common";
import _uniqueId from "lodash/uniqueId";

const MainApp = () => {
	const theme = useTheme();
	const [messageList, setMessageList] = useState([]);
	const [messageText, setMessageText] = useState("");
	const textInput = useRef();

	useEffect(() => {
		textInput.current?.focus();
		let len = messageList.length;
		if (len < 1 || messageList[len - 1].author === AUTHOR.bot) {
			return;
		}

		const timerId = setInterval(() => {
			setMessageList((prevState) => [
				...prevState,
				{
					id: _uniqueId("msg_"),
					author: AUTHOR.bot,
					text: BOT_ANSWER,
				},
			]);
		}, TIME_IN_SECONDS);

		return () => clearInterval(timerId);
	}, [messageList]);

	const handleClick = () => {
		if (messageText !== "") {
			setMessageList([
				...(messageList || []),
				{
					id: _uniqueId("msg_"),
					author: AUTHOR.me,
					text: messageText,
				},
			]);
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
			<ChatList messages={messageList} />
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

export default MainApp;
