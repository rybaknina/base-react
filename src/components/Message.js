import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AdbIcon from "@mui/icons-material/Adb";
import { AUTHOR } from "../constants/common";
import FaceIcon from "@mui/icons-material/Face";
import { Grid, useTheme } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
	const theme = useTheme();
	const { name } = useSelector((state) => state.profile);
	const isAuthorBot = (author) => {
		return author === AUTHOR.bot;
	};
	return (
		<Grid container>
			<Grid item xs={12}>
				<ListItem alignItems="flex-start">
					<ListItemAvatar>
						<Avatar
							style={{
								color: theme.palette.secondary.dark,
								backgroundColor: "transparent",
								alignItems: "flex-start",
							}}
						>
							{isAuthorBot(message.author) ? <AdbIcon /> : <FaceIcon />}
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							<Typography variant="body1" color={theme.palette.primary.dark}>
								{isAuthorBot(message.author) ? AUTHOR.bot : name}
							</Typography>
						}
						secondary={
							<Typography
								sx={{ display: "inline" }}
								component="span"
								variant="caption"
								color={theme.palette.secondary.dark}
							>
								{message.text}
							</Typography>
						}
					/>
				</ListItem>
				<Divider variant="inset" />
			</Grid>
		</Grid>
	);
};

export default Message;
