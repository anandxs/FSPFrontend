import { useForm } from "react-hook-form";

const AddMemberModal = ({ handleCreateToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const onSubmit = (data) => {
		console.log(data);
		handleCreateToggle();
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Add Member</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="my-2">
					<label htmlFor="email" className="font-semibold text-base block">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="block w-full"
						{...register("email", {
							required: "Email is required.",
						})}
					/>
					<p className="text-red-600">{errors?.email?.message}</p>
				</div>
				<div className="my-2">
					<label htmlFor="role" className="font-semibold text-base block">
						Role
					</label>
					<select
						id="role"
						className="w-full"
						{...register("roleId", {
							required: "Role is a required field.",
						})}
					></select>
					<p className="text-red-600">{errors?.roleId?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
				>
					Send
				</button>
			</form>
		</div>
	);
};

export default AddMemberModal;
