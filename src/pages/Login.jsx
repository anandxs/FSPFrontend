import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/auth/authSlice";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";

const Login = () => {
	const [error, setError] = useState();

	const form = useForm({});
	const { register, handleSubmit, formState } = form;
	const { errors, isSubmitting } = formState;

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const { email, password } = data;
		try {
			const userData = await login({ email, password }).unwrap();
			const token = userData.accessToken;
			const decodedToken = jwtDecode(token);
			const name =
				decodedToken[
					"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
				];
			const id =
				decodedToken[
					"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
				];
			dispatch(
				setCredentials({
					id,
					name,
					token,
				})
			);
			navigate("/");
		} catch (err) {
			if (err.status === 401) setError("Invalid credentials");
			else if (err.status === 500) setError("Internal server error");
			else setError("Network error");
		}
	};

	return (
		<section className="bg-secondary w-72 ml-auto mr-auto mt-40 p-3 rounded">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<h2 className="text-black font-bold text-2xl text-center mb-2">
					Login
				</h2>
				{error && <p className="text-red-600 text-xs">{error}</p>}
				<div className="mb-3 mt-2">
					<label htmlFor="email" className="block font-medium text-sm">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="block w-full border-accent"
						{...register("email", {
							required: "Email is a required field",
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
								message: "Enter a valid email address",
							},
						})}
					/>
					<p className="text-xs text-red-600 font-bond">
						{errors?.email?.message}
					</p>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="block font-medium text-sm">
						Password
					</label>
					<input
						type="password"
						id="passwrod"
						className="block w-full border-accent"
						{...register("password", {
							required: "Password is a required field.",
						})}
					/>
					<p className="text-xs text-red-600 font-bond">
						{errors?.password?.message}
					</p>
				</div>
				<div className="mb-3">
					<button
						type="submit"
						className="bg-primary text-sm block w-full rounded-sm py-0.5 text-white disabled:opacity-50"
						disabled={isSubmitting}
					>
						Login
					</button>
					<Link to="/register" className="text-xs hover:underline">
						Regiser a new account
					</Link>
				</div>
			</form>
		</section>
	);
};

export default Login;
