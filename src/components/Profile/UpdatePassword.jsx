import { useForm } from "react-hook-form";
import { useUpdatePasswordMutation } from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const UpdatePassword = () => {
	const form = useForm();
	const { register, watch, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const [updatePassword] = useUpdatePasswordMutation();

	const onSubmit = async ({ currentPassword, newPassword }) => {
		try {
			await updatePassword({ currentPassword, newPassword }).unwrap();
			toast.success("Password updated successfully!");
			setValue("currentPassword", "");
			setValue("confirmPassword", "");
			setValue("newPassword", "");
			setError("");
		} catch (err) {
			if (err?.status === 400) {
				toast.error("Incorrect password.");
			}
		}
	};

	return (
		<div className="w-10/12 md:w-3/4 mt-8 mx-auto text-xs sm:text-base">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="current-password" className="block font-medium">
						Current Password
					</label>
					<input
						type="password"
						id="current-password"
						className="block border border-black rounded-sm"
						{...register("currentPassword", {
							required: "This is a required field.",
						})}
					/>
					<p className="text-red-600 text-xs">
						{errors?.currentPassword?.message}
					</p>
				</div>
				<div className="mb-3">
					<label htmlFor="confirm-password" className="block font-medium">
						Re-enter password
					</label>
					<input
						type="password"
						id="confirm-password"
						className="block border border-black rounded-sm"
						{...register("confirmPassword", {
							validate: (val) => {
								return (
									watch("currentPassword") === val || "Passwords does not match"
								);
							},
						})}
					/>
					<p className="text-red-600 text-xs">
						{errors?.confirmPassword?.message}
					</p>
				</div>
				<div className="mb-3">
					<label htmlFor="newpassword" className="block font-medium">
						New Password
					</label>
					<input
						type="password"
						id="newPassword"
						className="block border border-black rounded-sm"
						{...register("newPassword", {
							required: "This is a required field.",
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
					<p className="text-red-600 text-xs">{errors?.newPassword?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-indigo-950 text-gray-50 font-semibold px-3 py-0.5 rounded text-sm"
				>
					Update Password
				</button>
			</form>
		</div>
	);
};

export default UpdatePassword;
