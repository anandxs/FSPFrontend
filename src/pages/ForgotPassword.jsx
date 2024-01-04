import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/auth/authApiSlice";

const ForgotPassword = () => {
	const [success, setSuccess] = useState(false);
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors, isSubmitting } = formState;
	const [forgotPassword] = useForgotPasswordMutation();
	const onSubmit = async ({ email }) => {
		try {
			await forgotPassword(email).unwrap();
			setSuccess(true);
		} catch (err) {
			console.log(err);
		}
	};

	return !success ? (
		<section className="flex justify-center items-center h-full">
			<div className="bg-secondary w-60 p-3 rounded">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2 className="text-text font-bold text-2xl text-center mb-2">
						Forgot Password
					</h2>
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
						<button
							type="submit"
							className="bg-primary text-sm block w-full rounded-sm py-0.5 text-white disabled:opacity-50"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Loading..." : "Login"}
						</button>
						<Link to="/register" className="block py-1 text-xs hover:underline">
							Regiser a new account
						</Link>
					</div>
				</form>
			</div>
		</section>
	) : (
		<ForgotPasswordRequestSuccess />
	);
};

const ForgotPasswordRequestSuccess = () => {
	return (
		<section className="flex flex-col justify-center items-center h-full">
			<p>
				A link for resetting your password has been sent to your registered
				email.
			</p>
			<br />
			<div className="flex flex-col items-center">
				<Link to={"/login"} className="underline">
					Click here to login with email and password.
				</Link>
				<Link to={"/register"} className="underline">
					Click here to register your account.
				</Link>
			</div>
		</section>
	);
};

export default ForgotPassword;
