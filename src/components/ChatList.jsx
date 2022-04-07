import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Messages from "./Messages";
import Divider from "@mui/material/Divider";
import { List, ListItem, useTheme } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import _uniqueId from "lodash/uniqueId";
import { useEffect, useState } from "react";

const ChatList = ({ messages = [] }) => {
	const [chatList, setChatList] = useState([]);
	const theme = useTheme();

	useEffect(() => {
		for (let i = 0; i < 10; i++) {
			const id = _uniqueId("chat_");
			setChatList((prevState) => [
				...prevState,
				{
					name: `Name_${id}`,
					id,
				},
			]);
		}
	}, []);

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Typography
						variant="h6"
						style={{
							backgroundColor: theme.palette.primary.light,
							color: theme.palette.primary.contrastText,
						}}
					>
						Список чатов
					</Typography>
				</Grid>
			</Grid>
			<Grid container component={Paper} style={{ width: "100%", height: "80vh" }}>
				<Grid item xs={3} style={{ borderRight: "1px solid #e0e0e0" }}>
					<List style={{ height: "77vh", overflow: "auto" }}>
						{chatList.map((chat) => (
							<div key={chat.id}>
								<ListItem>
									<FolderIcon style={{ color: theme.palette.secondary.dark }} />
									&nbsp;{chat.name}
								</ListItem>
								<Divider />
							</div>
						))}
					</List>
				</Grid>
				<Grid item xs={9} style={{ paddingTop: "6px" }}>
					<Messages messages={messages} />
				</Grid>
			</Grid>
		</>
	);
};
export default ChatList;
