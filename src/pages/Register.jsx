import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { useState } from "react";

const Register = () => {
	const [error, setError] = useState();
	const [success, setSuccess] = useState(false);

	const form = useForm();
	const { register, formState, handleSubmit, watch } = form;
	const { errors, isSubmitting } = formState;

	const [signup] = useRegisterMutation();

	const onSubmit = async (data) => {
		try {
			const { firstName, lastName, email, password } = data;
			const body = {
				firstName,
				lastName,
				email,
				password,
			};
			const response = await signup({ ...body }).unwrap();
			setSuccess(true);
		} catch (err) {
			if (err.status === 400) {
				const message = err.data["DuplicateEmail"][0];
				setError(message);
			} else if (err.status === 500) setError("Internal server error");
			else setError("Network error");
		}
	};

	return !success ? (
		<section className="flex justify-center items-center h-full">
			<div className="bg-secondary w-60 p-3 rounded">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2 className="text-black font-bold text-2xl text-center mb-2">
						Register
					</h2>
					{error && <p className="text-red-600 text-xs">{error}</p>}
					<div className="mb-3 mt-2">
						<label htmlFor="first-name" className="block font-medium text-sm">
							First Name
						</label>
						<input
							type="text"
							id="firstname"
							className="block w-full border-accent"
							{...register("firstName", {
								required: "First name is a required field",
							})}
						/>
						<p className="text-xs text-red-600 font-bond">
							{errors?.firstName?.message}
						</p>
					</div>
					<div className="mb-3">
						<label htmlFor="last-name" className="block font-medium text-sm">
							Last Name
						</label>
						<input
							type="text"
							id="lastname"
							className="block w-full border-accent"
							{...register("lastName", {
								required: "Last name is a required field.",
							})}
						/>
						<p className="text-xs text-red-600 font-bond">
							{errors?.lastName?.message}
						</p>
					</div>
					<div className="mb-3">
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
							id="password"
							className="block w-full border-accent"
							{...register("password", {
								required: "Password is a required field.",
								validate: {
									requrieSixCharacters: (val) => {
										return (
											val.length >= 6 ||
											"Password should be atleast 6 characters long."
										);
									},
									containAtleastOneDigit: (val) => {
										return (
											/\d/.test(val) ||
											"Password should contain atleast one digit."
										);
									},
									containAtleastOneAlphabet: (val) => {
										return (
											/[a-z]/.test(val) ||
											"Password should contain atleast one alphabet."
										);
									},
								},
							})}
						/>
						<p className="text-xs text-red-600 font-bond">
							{errors?.password?.message}
						</p>
					</div>
					<div className="mb-3">
						<label
							htmlFor="confirm-password"
							className="block font-medium text-sm"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirm-password"
							className="block w-full border-accent"
							{...register("confirmPassword", {
								validate: (val) => {
									if (val !== watch("password"))
										return "Confirmation password should match password.";
								},
							})}
						/>
						<p className="text-xs text-red-600 font-bond">
							{errors?.confirmPassword?.message}
						</p>
					</div>
					<div className="mb-3">
						<button
							type="submit"
							className="bg-primary text-xs block w-full rounded-sm py-0.5 text-white disabled:opacity-50"
							disabled={isSubmitting}
						>
							Register
						</button>
						<Link to="/login" className="text-xs hover:underline">
							Login with existing account
						</Link>
					</div>
				</form>
			</div>
		</section>
	) : (
		<section className="h-full flex flex-col justify-center items-center">
			<p>Thank you for registering!</p>
			<p>Verification mail has been sent to your email address.</p>
			<p>Login after verifying your account.</p>
		</section>
	);
};

export default Register;
