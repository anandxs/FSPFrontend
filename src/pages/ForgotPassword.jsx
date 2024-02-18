import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../features/auth/authApiSlice";
import LoadingButton from "../components/LoadingButton";

const ForgotPassword = () => {
	const [success, setSuccess] = useState(false);
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors, isSubmitting } = formState;
	const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
	const onSubmit = async ({ email }) => {
		try {
			await forgotPassword(email).unwrap();
			setSuccess(true);
		} catch (err) {
			console.log(err);
		}
	};

	return !success ? (
		<section className="flex justify-center items-center w-screen h-screen">
			<div className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
				<h1 className="text-2xl font-bold text-center">Forgot Password</h1>
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
					{isSubmitting || isLoading ? (
						<LoadingButton />
					) : (
						<button
							type="submit"
							className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
						>
							Submit
						</button>
					)}
					<div className="flex flex-col text-xs text-gray-600">
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
		<section className="px-4 py-24 mx-auto max-w-7xl">
			<div className="w-full mx-auto text-center lg:w-2/3">
				<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
					A link for resetting your password has been sent to your registered
					email.
				</p>
				<br />
				<div className="flex flex-col items-center">
					<p>
						Click{" "}
						<Link to={"/login"} className="underline">
							here
						</Link>{" "}
						to login with email and password.
					</p>
					<p>
						Click{" "}
						<Link to={"/register"} className="underline">
							here
						</Link>{" "}
						to register your account.
					</p>
				</div>
			</div>
		</section>
	);
};

export default ForgotPassword;
