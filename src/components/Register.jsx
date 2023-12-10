import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { toast } from "react-toastify";

const Register = ({ setRegSuccess }) => {
	const form = useForm();
	const { register, formState, handleSubmit, watch } = form;
	const { errors, isSubmitting } = formState;

	const [signup] = useRegisterMutation();

	const onSubmit = (data) => {
		const { firstName, lastName, email, password } = data;
		const body = {
			firstName,
			lastName,
			email,
			password,
		};
		signup({ ...body })
			.unwrap()
			.then(() => {
				toast.success("Account created successfully");
				setRegSuccess(true);
			})
			.catch((err) => {
				if (err?.status === 400) {
					const message = err?.data["DuplicateEmail"][0];
					toast.error(message);
				} else if (err?.status === 500) {
					toast.error("Internal server error");
				} else {
					toast.error("Network error");
				}
			});
	};

	return (
		<section>
			<div>
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2>Register</h2>
					<div>
						<label htmlFor="first-name">First Name</label>
						<input
							type="text"
							id="firstname"
							{...register("firstName", {
								required: "First name is a required field",
							})}
						/>
						<p>{errors?.firstName?.message}</p>
					</div>
					<div>
						<label htmlFor="last-name">Last Name</label>
						<input
							type="text"
							id="lastname"
							{...register("lastName", {
								required: "Last name is a required field.",
							})}
						/>
						<p>{errors?.lastName?.message}</p>
					</div>
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
						/>
						<p>{errors?.password?.message}</p>
					</div>
					<div>
						<label htmlFor="confirm-password">Confirm Password</label>
						<input
							type="password"
							id="confirm-password"
							{...register("confirmPassword", {
								validate: (val) => {
									if (val !== watch("password"))
										return "Confirmation password should match password.";
								},
							})}
						/>
						<p>{errors?.confirmPassword?.message}</p>
					</div>
					<div>
						<button type="submit" disabled={isSubmitting}>
							Register
						</button>
						<Link to="/login">Login with existing account</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default Register;
