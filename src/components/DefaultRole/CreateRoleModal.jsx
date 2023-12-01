import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../features/defaultRole/defaultRoleApiSlice";

const CreateRoleModal = ({ handletoggleCreate }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [create, { isLoading }] = useCreateRoleMutation();

	const handleCreateRole = ({ name }) => {
		create({ name })
			.unwrap()
			.then(() => {
				console.log("success");
				handletoggleCreate();
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
			<h1 className="text-2xl font-bold mb-2 py-1">Create Role</h1>
			<form noValidate onSubmit={handleSubmit(handleCreateRole)}>
				<p className="text-red-600 text-xs">{errors?.name?.message}</p>
				<input
					type="text"
					className="block mb-2 w-full"
					placeholder="Enter role name"
					{...register("name", {
						required: "Role name is required.",
					})}
				/>
				<button
					type="submit"
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateRoleModal;
