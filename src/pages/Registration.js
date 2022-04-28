import { useState } from "react";
import { Button, TextField, useTheme } from "@mui/material";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import firebaseConfig from "../services/firebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Registration = () => {
	const theme = useTheme();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	let navigate = useNavigate();
	let from = location.state?.from?.pathname || "/";
	const schema = yup.object().shape({
		email: yup.string().email().required(),
		password: yup
			.string()
			.required()
			.matches(
				/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
				"Must contain 8 characters, one uppercase, one lowercase, one number and one special case character",
			),
	});
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = async () => {
		try {
			const auth = getAuth(firebaseConfig);
			await createUserWithEmailAndPassword(auth, email, password);
			setEmail("");
			setPassword("");
			navigate(from, { replace: true });
		} catch (e) {
			toast.error(e.message, {
				position: "top-right",
				autoClose: 5000,
			});
			console.error(e);
		}
	};

	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div className="App">
			<ToastContainer />
			<h2 style={{ color: theme.palette.primary.dark }}>Registration</h2>
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
					onChange={handleEmailChange}
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
					onChange={handlePasswordChange}
				/>
				<span style={{ color: "red" }}>{errors?.password && errors.password?.message}</span>
				<Button
					style={{ color: theme.palette.primary.contrastText }}
					type="submit"
					variant="contained"
					fullWidth
				>
					Зарегистрироваться
				</Button>
				<span style={{ color: theme.palette.secondary.dark }}>
					Аккаунт уже есть? <Link to="/login">Войти</Link>
				</span>
			</form>
		</div>
	);
};

export default Registration;
