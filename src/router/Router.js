import { Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ListItemIcon, MenuItem, MenuList, useTheme } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import NotFound from "../pages/NotFound";
import { AUTHOR } from "../constants/common";
import MessageList from "../components/MessageList";
import { useState } from "react";

const initialChats = {
	id1: {
		name: "chat1",
		messages: [{ id: "msg-1", author: AUTHOR.bot, text: "Message 1" }],
	},
	id2: {
		name: "chat2",
		messages: [{ id: "msg-2", author: AUTHOR.me, text: "Message 2" }],
	},
};
const Router = () => {
	let theme = useTheme();
	const [chats, setChats] = useState(initialChats);
	const addMessage = (chatId, message) => {
		setChats({
			...chats,
			[chatId]: {
				name: chats[chatId].name,
				messages: [...chats[chatId].messages, message],
			},
		});
	};
	return (
		<>
			<MenuList
				style={{
					display: "flex",
					backgroundColor: theme.palette.primary.light,
					color: theme.palette.primary.contrastText,
					marginBottom: "5px",
				}}
			>
				<MenuItem component={Link} to="/">
					Home
				</MenuItem>
				<MenuItem component={Link} to="/chats">
					Chats
				</MenuItem>
				<MenuItem component={Link} to="/profile">
					<ListItemIcon>
						<AccountBoxIcon fontSize="small" />
					</ListItemIcon>
				</MenuItem>
			</MenuList>
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/chats" element={<Chats chats={chats} addMessage={addMessage} />}>
					<Route path=":chatId" element={<MessageList chats={chats} />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default Router;
