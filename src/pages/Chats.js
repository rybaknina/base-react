import ControlPanel from "../components/ControlPanel";
import ChatList from "../components/ChatList";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Button, useTheme } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Chats = ({ chats, addMessage }) => {
	const theme = useTheme();
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
						<Button
							style={{ color: theme.palette.primary.contrastText }}
							// todo onClick={addChat}
						>
							<AddBoxIcon />
						</Button>
					</Typography>
				</Grid>
			</Grid>
			<Grid container component={Paper} style={{ width: "100%", height: "74vh" }}>
				<ChatList chats={chats} />
			</Grid>
			<ControlPanel addMessage={addMessage} />
		</>
	);
};

export default Chats;
