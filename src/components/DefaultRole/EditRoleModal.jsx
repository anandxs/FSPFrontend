import { useForm } from "react-hook-form";
import { useUpdateRoleMutation } from "../../features/defaultRole/defaultRoleApiSlice";

const EditRoleModal = ({ handleEditToggle, init, params }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [updateRole] = useUpdateRoleMutation();

	const onSubmit = (data) => {
		const { name } = data;
		updateRole({
			roleId: params?.roleId,
			name,
		})
			.unwrap()
			.then(() => {
				handleEditToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Edit Role</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-2">
					<input
						type="text"
						className="w-full"
						{...register("name", {
							required: "Role is required.",
						})}
					/>
					<p className="text-red-600 text-xs pt-1">{errors?.name?.message}</p>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
					>
						Update
					</button>
					<button
						type="submit"
						className="bg-orange-600 text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
						onClick={handleEditToggle}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditRoleModal;
