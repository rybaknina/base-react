import Message from "./Message";
import List from "@mui/material/List";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MessageList = () => {
	const theme = useTheme();
	const allMessages = useSelector((state) => state.messages.messageList);
	const { chatId } = useParams();
	if (chatId === undefined || !allMessages[chatId]) return null;
	let messages = allMessages[chatId];

	// todo
	// const messagesEndRef = useRef(null);
	//
	// const scrollToBottom = () => {
	// 	messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	// };
	//
	// useEffect(scrollToBottom, [allMessages]);

	return (
		<Grid item xs={9} style={{ paddingTop: "6px" }}>
			<List
				style={{
					height: "73vh",
					overflow: "auto",
					backgroundColor: theme.palette.primary.light,
				}}
			>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
				{/*<div ref={messagesEndRef} />*/}
			</List>
		</Grid>
	);
};

export default MessageList;
