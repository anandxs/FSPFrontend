import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingButton from "../components/LoadingButton";

const Register = () => {
	const [success, setSuccess] = useState(false);
	const form = useForm();
	const { register, formState, handleSubmit, watch } = form;
	const { errors, isSubmitting } = formState;
	const [signup, { isLoading }] = useRegisterMutation();

	const onSubmit = async (data) => {
		const { firstName, lastName, email, password } = data;
		const body = {
			firstName,
			lastName,
			email,
			password,
		};

		try {
			await signup({ ...body }).unwrap();
			toast.success("Account created successfully");
			setSuccess(true);
		} catch (err) {
			if (err?.status === 400) {
				const message = err?.data["DuplicateEmail"][0];
				toast.error(message);
			} else if (err?.status === 500) {
				toast.error("Internal server error");
			} else {
				toast.error("Network error");
			}
		}
	};

	return !success ? (
		<section className="flex justify-center items-center w-screen h-screen mt-24">
			<div className="mt-11 pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800">
				<h1 className="text-2xl font-bold text-center">Register</h1>
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className="space-y-6"
				>
					<div className="space-y-1 text-sm">
						<label htmlFor="first-name" className="block text-gray-600">
							First Name
						</label>
						<input
							type="text"
							id="firstname"
							placeholder="First Name"
							{...register("firstName", {
								required: "First name is a required field",
							})}
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						/>
						<p className="text-xs text-red-600">{errors?.firstName?.message}</p>
					</div>
					<div className="space-y-1 text-sm">
						<label htmlFor="last-name" className="block text-gray-600">
							Last Name
						</label>
						<input
							type="text"
							id="lastname"
							placeholder="Last Name"
							{...register("lastName", {
								required: "Last name is a required field.",
							})}
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						/>
						<p className="text-xs text-red-600">{errors?.lastName?.message}</p>
					</div>
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
					<div className="space-y-1 text-sm">
						<label htmlFor="password" className="block text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
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
							className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						/>
						<p className="text-xs text-red-600">{errors?.password?.message}</p>
					</div>
					<div className="space-y-1 text-sm">
						<label htmlFor="confirm-password" className="block text-gray-600">
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
						<p className="text-xs text-red-600">
							{errors?.confirmPassword?.message}
						</p>
					</div>
					{isSubmitting || isLoading ? (
						<LoadingButton />
					) : (
						<button
							type="submit"
							className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
						>
							Register
						</button>
					)}
					<div className="flex flex-col text-xs text-gray-600">
						<Link to="/login" className="text-xs hover:underline">
							Login with existing account
						</Link>
					</div>
				</form>
			</div>
		</section>
	) : (
		<RegistrationSuccess />
	);
};

const RegistrationSuccess = () => (
	<section className="px-4 py-24 mx-auto max-w-7xl">
		<div className="w-full mx-auto text-center lg:w-2/3">
			<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
				Thank you for registering!
			</p>
			<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
				Verification mail has been sent to your email address.
			</p>
			<p className="mb-3 text-xl font-bold text-gray-900 md:text-2xl">
				Login after verifying your account.
			</p>
		</div>
	</section>
);

export default Register;
