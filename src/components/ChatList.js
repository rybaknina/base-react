import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import {
	Avatar,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import MessageList from "./MessageList";

const ChatList = ({ chats }) => {
	const theme = useTheme();

	return (
		<>
			<Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
				<List style={{ height: "71vh", overflow: "auto" }}>
					{Object.keys(chats).map((chat, index) => (
						<Link to={`/chats/${chat}`} key={index}>
							<ListItem
								key={index}
								secondaryAction={
									<IconButton edge="end" aria-label="delete">
										<DeleteIcon />
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
								<ListItemText primary={chats[chat].name} />
							</ListItem>
							<Divider />
						</Link>
					))}
				</List>
			</Grid>
			<MessageList chats={chats} />
		</>
	);
};
export default ChatList;
