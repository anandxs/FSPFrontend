import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../features/role/roleApiSlice";
import { useContext } from "react";
import { RoleContext } from "./Roles";

const CreateRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId } = useContext(RoleContext);

	const [createRoleAsync, { isLoading }] = useCreateRoleMutation();

	const onSubmit = ({ role }) => {
		const body = {
			name: role,
		};
		createRoleAsync({ projectId, body })
			.unwrap()
			.then(() => {
				handleToggle();
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
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="block w-full"
					placeholder="Enter role name"
					{...register("role", {
						required: "Role name is required.",
					})}
				/>
				<p className="text-red-600 text-xs my-1">{errors?.role?.message}</p>
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
