import Message from "./Message";
import List from "@mui/material/List";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import getMessageList from "../store/messages/selectors";
import { useEffect } from "react";
import { getMessagesByChatIdWithFB } from "../middlewares/middleware";

const MessageList = () => {
	const theme = useTheme();
	const allMessages = useSelector(getMessageList);
	const { chatId } = useParams();
	const dispatch = useDispatch();
	let messages = allMessages[chatId];

	// todo
	// const messagesEndRef = useRef(null);
	//
	// const scrollToBottom = () => {
	// 	messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	// };
	//
	// useEffect(scrollToBottom, [allMessages]);

	useEffect(() => {
		if (!chatId) return;
		dispatch(getMessagesByChatIdWithFB(chatId));
	}, [chatId]);

	return (
		<Grid item xs={9} style={{ paddingTop: "6px" }}>
			<List
				style={{
					height: "73vh",
					overflow: "auto",
					backgroundColor: theme.palette.primary.light,
				}}
			>
				{messages?.map((message, index) => (
					<Message key={index} message={message} />
				))}
				{/*<div ref={messagesEndRef} />*/}
			</List>
		</Grid>
	);
};

export default MessageList;
