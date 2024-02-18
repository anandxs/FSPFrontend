import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useUpdateUserInfoMutation } from "../../features/user/userApiSlice";
import { useDispatch } from "react-redux";
import { updateName } from "../../features/auth/authSlice";

const UpdateProfile = () => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const [updateInfo] = useUpdateUserInfoMutation();
	const dispatch = useDispatch();

	const onSubmit = async (data) => {
		const { firstName, lastName } = data;
		try {
			await updateInfo({
				firstName,
				lastName,
			}).unwrap();
			dispatch(
				updateName({
					firstName,
					lastName,
				})
			);
			toast.success("Profile name updated successfully");
			setValue("firstName", "");
			setValue("lastName", "");
		} catch (err) {
			console.log(err);
			toast.error(err?.data?.Message);
		}
	};

	return (
		<div className="w-10/12 md:w-3/4 mt-8 mx-auto text-xs sm:text-base">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-3">
					<label htmlFor="firstName" className="block font-medium">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						className="block border border-black rounded-sm"
						{...register("firstName", {
							required: "First name is a required field.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.firstName?.message}</p>
				</div>
				<div className="mb-3">
					<label htmlFor="lastName" className="block font-medium">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						className="block border border-black rounded-sm"
						{...register("lastName", {
							required: "Last name is a required field.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.lastName?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-blue-600 text-gray-50 font-semibold px-3 py-0.5 rounded text-sm"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default UpdateProfile;
