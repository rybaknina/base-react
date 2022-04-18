import Grid from "@mui/material/Grid";
import { Fab, TextField, useTheme } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import _uniqueId from "lodash/uniqueId";
import { AUTHOR, BOT_ANSWER, TIME_IN_SECONDS } from "../constants/common";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../store/messages/actions";

const ControlPanel = () => {
	const theme = useTheme();
	let { chatId } = useParams();
	const [messageText, setMessageText] = useState("");
	const textInput = useRef();
	const dispatch = useDispatch();
	const author = useSelector((state) => state.profile.name);
	const allMessages = useSelector((state) => state.messages.messageList);
	const messages = allMessages[chatId] || [];

	useEffect(() => {
		textInput.current?.focus();
		let len = messages.length;
		if (len < 1 || messages[len - 1].author === AUTHOR.bot) {
			return;
		}
		const timerId = setInterval(() => {
			const text = BOT_ANSWER + messages[len - 1].id;
			const newMessage = {
				id: _uniqueId("msg_"),
				author: AUTHOR.bot,
				text,
			};
			dispatch(addMessage(chatId, newMessage));
		}, TIME_IN_SECONDS);

		return () => clearInterval(timerId);
	}, [messages, chatId]);

	const handleClick = () => {
		if (messageText !== "") {
			const newMessage = {
				id: _uniqueId("msg_"),
				author,
				text: messageText,
			};
			dispatch(addMessage(chatId, newMessage));
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
