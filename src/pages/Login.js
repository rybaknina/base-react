import { useForm } from "react-hook-form";
import { Button, TextField, useTheme } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/AuthProvider";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
	const theme = useTheme();
	let navigate = useNavigate();
	let location = useLocation();
	let auth = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let from = location.state?.from?.pathname || "/";

	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup.string().required(),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const onSubmit = async () => {
		try {
			await auth.signin({ email, password }, () => {
				setTimeout(() => navigate(from, { replace: true }), 500);
			});
			setEmail("");
			setPassword("");
		} catch (e) {
			toast.error(e.message);
			console.log(e);
		}
	};

	return (
		<div className="App">
			<ToastContainer />
			<h2 style={{ color: theme.palette.primary.dark }}>Login</h2>
			<form onSubmit={handleSubmit(onSubmit)} className="column">
				<TextField
					placeholder="Enter email"
					name="email"
					type="email"
					variant="outlined"
					label="Email"
					{...register("email")}
					error={!!(errors?.email && errors.email?.message)}
					autoFocus={true}
					fullWidth
					value={email}
					onChange={handleEmail}
				/>
				<span style={{ color: "red" }}>{errors?.email && errors.email?.message}</span>
				<TextField
					placeholder="Enter strong password"
					name="password"
					type="password"
					variant="outlined"
					label="Password"
					{...register("password")}
					error={!!(errors?.password && errors.password?.message)}
					fullWidth
					value={password}
					onChange={handlePassword}
				/>
				<span style={{ color: "red" }}>{errors?.password && errors.password?.message}</span>
				<Button
					style={{ color: theme.palette.primary.contrastText }}
					type="submit"
					variant="contained"
					fullWidth
				>
					Войти
				</Button>
				<span style={{ color: theme.palette.secondary.dark }}>
					Аккаунт не существует? <Link to="/registration">Зарегистрироваться</Link>
				</span>
			</form>
		</div>
	);
};

export default Login;
