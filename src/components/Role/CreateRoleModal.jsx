import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../features/role/roleApiSlice";
import { useContext, useState, useEffect } from "react";
import { RoleContext } from "./Roles";

const CreateRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const { projectId } = useContext(RoleContext);

	const [createRoleAsync, { isLoading }] = useCreateRoleMutation();
	const [error, setError] = useState();

	useEffect(() => {
		setError();
	}, [watch("role")]);

	const onSubmit = async ({ role }) => {
		const body = {
			name: role,
		};
		try {
			await createRoleAsync({ projectId, body }).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
			setError(err?.data?.Message);
		}
	};

	return (
		<div
			className="bg-accent p-3 w-screen sm:w-2/3 sm:max-w-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold mb-2">Create Role</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					className="block w-full text-sm"
					placeholder="Enter role name"
					{...register("role", {
						required: "Role name is required.",
					})}
				/>
				<p className="text-red-600 text-xs mb-1">{errors?.role?.message}</p>
				<p className="text-red-600 text-xs mb-1">{error}</p>
				<button
					type="submit"
					className="bg-primary text-white text-sm font-semibold p-1 rounded-sm w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateRoleModal;
