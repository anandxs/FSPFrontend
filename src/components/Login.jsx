import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useLazyGetUserInfoQuery } from "../features/user/userApiSlice";

const Login = () => {
	const [error, setError] = useState();
	const navigate = useNavigate();

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

						if (role === "SUPERADMIN") {
							navigate("/admin");
						}
					})
					.catch((err) => {
						console.log(err);
					});
			})
			.catch((err) => {
				if (err.status === 401) setError("Invalid credentials");
				else if (err.status === 403) setError("You have been blocked");
				else if (err.status === 500) setError("Internal server error");
				else setError("Network error");
			});
	};

	return (
		<section className="flex justify-center items-center h-full">
			<div className="bg-secondary w-60 p-3 rounded">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2 className="text-text font-bold text-2xl text-center mb-2">
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
						<Link
							to="/forgotpassword"
							className="block py-1 text-xs hover:underline"
						>
							Forgot Password?
						</Link>
						<Link to="/register" className="block py-1 text-xs hover:underline">
							Register New Account
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Login;
