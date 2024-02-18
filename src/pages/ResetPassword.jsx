import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../features/auth/authApiSlice";
import { toast } from "react-toastify";

const ResetPassword = () => {
	const [searchParams] = useSearchParams();

	const navigate = useNavigate();

	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors, isSubmitting } = formState;

	const [resetPassword] = useResetPasswordMutation();

	const onSubmit = ({ password }) => {
		const code = searchParams.get("code");
		const userId = searchParams.get("userid");
		resetPassword({ code, userId, newPassword: password })
			.unwrap()
			.then(() => {
				toast.success("Password reset successfully");
				navigate("/login");
			})
			.catch((err) => {
				if (err?.status == 400) {
					toast.error(err?.data?.Message);
				} else {
					toast.error("Internal server error");
				}
			});
	};

	return (
		<section className="flex justify-center items-center h-full">
			<div className="bg-blue-300 w-60 p-3 rounded">
				<form onSubmit={handleSubmit(onSubmit)} noValidate>
					<h2 className="text-text font-bold text-2xl text-center mb-2">
						Reset Password
					</h2>
					<div className="mb-3 mt-2">
						<label htmlFor="password" className="block font-medium text-sm">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="block w-full border-accent"
							{...register("password", {
								required: "Password is a required field",
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
					<div className="mb-3 mt-2">
						<label
							htmlFor="confirmpassword"
							className="block font-medium text-sm"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmpassword"
							className="block w-full border-accent"
							{...register("confirmPassword", {
								validate: (val) => {
									return watch("password") === val || "Passwords should match.";
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
							className="bg-blue-600 text-sm block w-full rounded-sm py-0.5 text-white disabled:opacity-50"
							disabled={isSubmitting}
						>
							Reset
						</button>
						<Link to="/register" className="block py-1 text-xs hover:underline">
							Regiser a new account
						</Link>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ResetPassword;
