import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {
	Avatar,
	Button,
	Dialog,
	DialogTitle,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Paper,
	TextField,
	useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import MessageList from "./MessageList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addChat, deleteChat } from "../store/chats/actions";
import AddBoxIcon from "@mui/icons-material/AddBox";

const ChatList = () => {
	const theme = useTheme();
	const chats = useSelector((state) => state.chats.chatList);
	const [visible, setVisible] = useState(false);
	const [chatName, setChatName] = useState("");
	const dispatch = useDispatch();

	useEffect(() => {
		chatName.current?.focus();
	});

	const handleSave = () => {
		if (chatName !== "") {
			dispatch(addChat(chatName));
			setChatName("");
			handleClose();
		}
	};
	const handleAdd = () => {
		setVisible(true);
	};
	const handleChatName = (e) => {
		setChatName(e.target.value);
	};
	const handleClose = () => {
		setVisible(false);
	};
	const handleKeypress = (event) => {
		if (event.key === "Enter") {
			handleSave();
		}
	};
	const handleDelete = (chatId) => {
		dispatch(deleteChat(chatId));
	};

	return (
		<>
			<Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
				<Button style={{ color: theme.palette.primary.contrastText }} onClick={handleAdd}>
					<AddBoxIcon />
				</Button>
				<Dialog open={visible} onClose={handleClose}>
					<Paper style={{ padding: "10px" }}>
						<DialogTitle>Enter name of chat</DialogTitle>
						<TextField
							placeholder="chat name"
							autoFocus={true}
							value={chatName}
							onChange={handleChatName}
							onKeyPress={handleKeypress}
						/>
						<Button style={{ marginTop: "10px" }} onClick={handleSave}>
							Save chat
						</Button>
					</Paper>
				</Dialog>
				<List style={{ height: "70vh", overflow: "auto" }}>
					{chats?.length > 0 ? (
						chats.map((chat) => (
							<Link to={`/chats/${chat.id}`} key={chat.id}>
								<ListItem
									secondaryAction={
										<IconButton edge="end" aria-label="delete">
											<DeleteIcon onClick={() => handleDelete(chat.id)} />
										</IconButton>
									}
								>
									<ListItemAvatar>
										<Avatar>
											<FolderIcon
												style={{ color: theme.palette.secondary.dark }}
											/>
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary={chat.name} />
								</ListItem>
								<Divider />
							</Link>
						))
					) : (
						<div>Chat not found</div>
					)}
				</List>
			</Grid>
			<MessageList />
		</>
	);
};
export default ChatList;
