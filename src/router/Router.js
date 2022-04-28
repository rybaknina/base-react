import { Link, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { ListItemIcon, MenuItem, MenuList, useTheme } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Profile from "../pages/Profile";
import Chats from "../pages/Chats";
import NotFound from "../pages/NotFound";
import MessageList from "../components/MessageList";
import Gists from "../pages/Gists";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import RequireAuth from "../hocs/RequireAuth";

const Router = () => {
	let theme = useTheme();

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
				<MenuItem component={Link} to="/gists">
					Gists
				</MenuItem>
				<MenuItem component={Link} to="/profile">
					<ListItemIcon>
						<AccountBoxIcon fontSize="small" />
					</ListItemIcon>
				</MenuItem>
				<MenuItem component={Link} to="/login">
					Login
				</MenuItem>
				<MenuItem component={Link} to="/registration">
					Registration
				</MenuItem>
			</MenuList>
			<Routes>
				<Route path="/" exact element={<Home />} />

				<Route path="/login" element={<Login />} />
				<Route path="/registration" element={<Registration />} />
				<Route element={<RequireAuth />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/gists" element={<Gists />} />
					<Route path="/chats" element={<Chats />}>
						<Route path=":chatId" element={<MessageList />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
};

export default Router;
