import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useLazyGetUserInfoQuery } from "../features/user/userApiSlice";

const Login = () => {
	const [error, setError] = useState();

	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors, isSubmitting } = formState;

	const [loginUser] = useLoginMutation();
	const [getUser] = useLazyGetUserInfoQuery();
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		const { email, password } = data;
		loginUser({ email, password })
			.unwrap()
			.then((authTokens) => {
				const accessToken = authTokens.accessToken;
				const refreshToken = authTokens.refreshToken;
				getUser()
					.unwrap()
					.then(({ id, role, firstName, lastName, email }) => {
						dispatch(
							logIn({
								id,
								firstName,
								lastName,
								role,
								email,
								accessToken,
								refreshToken,
							})
						);
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				if (err.status === 401) setError("Invalid credentials");
				else if (err.status === 500) setError("Internal server error");
				else setError("Network error");
			});
	};

	return (
		<section>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2>Login</h2>
					{error && <p>{error}</p>}
					<div>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							{...register("email", {
								required: "Email is a required field",
								pattern: {
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
									message: "Enter a valid email address",
								},
							})}
						/>
						<p>{errors?.email?.message}</p>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="passwrod"
							{...register("password", {
								required: "Password is a required field.",
							})}
						/>
						<p>{errors?.password?.message}</p>
					</div>
					<div>
						<button type="submit" disabled={isSubmitting}>
							Login
						</button>
						<Link to="/forgotpassword">Forgot Password?</Link>
						<Link to="/register">Register New Account</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;
