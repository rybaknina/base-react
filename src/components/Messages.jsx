import Message from "./Message";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material";

const Messages = ({ messages = [] }) => {
	const theme = useTheme();
	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(scrollToBottom, [messages]);
	return (
		<List
			style={{
				height: "77vh",
				overflow: "auto",
				backgroundColor: theme.palette.primary.light,
			}}
		>
			{messages.map((message) => (
				<Message key={message.id} message={message} />
			))}
			<div ref={messagesEndRef} />
		</List>
	);
};

export default Messages;

Messages.propTypes = {
	messages: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			author: PropTypes.string,
			text: PropTypes.string,
		}),
	),
};
