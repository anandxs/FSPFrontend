import { useForm } from "react-hook-form";
import { useUpdateUserInfoMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProfile = () => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [updateInfo] = useUpdateUserInfoMutation();

	const navigate = useNavigate();

	const onSubmit = (data) => {
		updateInfo({
			firstName: data.firstName,
			lastName: data.lastName,
		})
			.unwrap()
			.then(() => {
				toast.success("Profile name updated successfully");
				navigate("/load");
			})
			.catch((err) => {
				console.log(err);
				toast.error(err?.data?.Message);
			});
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
					className="bg-primary text-white font-semibold px-3 py-0.5 rounded text-sm"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default UpdateProfile;
