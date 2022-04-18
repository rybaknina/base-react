import ControlPanel from "../components/ControlPanel";
import ChatList from "../components/ChatList";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const Chats = () => {
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
							padding: "5px 15px",
						}}
					>
						Список чатов
					</Typography>
				</Grid>
			</Grid>
			<Grid container component={Paper} style={{ width: "100%", height: "76vh" }}>
				<ChatList />
			</Grid>
			<ControlPanel />
		</>
	);
};

export default Chats;
