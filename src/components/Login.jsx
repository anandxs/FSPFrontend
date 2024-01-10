import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useLazyGetUserInfoQuery } from "../features/user/userApiSlice";
import LoadingButton from "../components/LoadingButton";

const Login = () => {
	const [error, setError] = useState();
	const navigate = useNavigate();

	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors, isSubmitting } = formState;

	const [loginUser, { isLoading: loginLoading }] = useLoginMutation();
	const [getUser] = useLazyGetUserInfoQuery();
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		try {
			const authTokens = await loginUser({
				email: data?.email,
				password: data?.password,
			}).unwrap();
			const accessToken = authTokens.accessToken;
			const refreshToken = authTokens.refreshToken;

			const { id, role, firstName, lastName, email } = await getUser({
				accessToken,
			}).unwrap();
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
		} catch (err) {
			console.log(err);

			if (err.status === 401) {
				if (err?.data?.Message) {
					setError(err?.data?.Message);
				} else {
					setError("Invalid credentials");
				}
			} else if (err.status === 403) setError("You have been blocked");
			else if (err.status === 500) setError("Internal server error");
			else setError("Network error");
		}
	};

	return (
		<section className="flex justify-center items-center w-screen h-screen">
			<div className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
				<h1 className="text-2xl font-bold text-center">Login</h1>
				{error && <p className="text-red-600 text-xs">{error}</p>}
				<form
					className="space-y-6"
					onSubmit={handleSubmit(onSubmit)}
					noValidate
				>
					<div className="space-y-1 text-sm">
						<label htmlFor="email" className="block text-gray-600">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							{...register("email", {
								required: "Email is a required field",
								pattern: {
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
									message: "Enter a valid email address",
								},
							})}
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						/>
						<p className="text-xs text-red-600">{errors?.email?.message}</p>
					</div>
					<div className="space-y-1 text-sm">
						<label htmlFor="password" className="block text-gray-600">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							{...register("password", {
								required: "Password is a required field.",
							})}
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						/>
						<p className="text-xs text-red-600">{errors?.password?.message}</p>
					</div>
					{isSubmitting || loginLoading ? (
						<LoadingButton />
					) : (
						<button
							type="submit"
							className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
						>
							Login
						</button>
					)}

					<div className="flex flex-col text-xs text-gray-600">
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
