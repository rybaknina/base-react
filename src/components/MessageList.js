import Message from "./Message";
import List from "@mui/material/List";
import { useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

const MessageList = ({ chats }) => {
	const theme = useTheme();
	const { chatId } = useParams();
	if (chatId === undefined || !chats[chatId]) return null;
	let messages = chats[chatId].messages;
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages]);

	return (
		<Grid item xs={9} style={{ paddingTop: "6px" }}>
			<List
				style={{
					height: "71vh",
					overflow: "auto",
					backgroundColor: theme.palette.primary.light,
				}}
			>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
				<div ref={messagesEndRef} />
			</List>
		</Grid>
	);
};

export default MessageList;
