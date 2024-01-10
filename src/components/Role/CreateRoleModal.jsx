import { useForm } from "react-hook-form";
import { useCreateRoleMutation } from "../../features/role/roleApiSlice";
import { useContext, useState, useEffect } from "react";
import { RoleContext } from "./Roles";
import LoadingButton from "../LoadingButton";

const CreateRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, watch } = form;
	const { errors } = formState;

	const { projectId } = useContext(RoleContext);

	const [createRoleAsync, { isLoading, isSubmitting }] =
		useCreateRoleMutation();
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
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Create Role</h1>
			<p className="text-red-600 text-xs">{error}</p>
			<form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-1 text-sm">
					<input
						type="text"
						className="block w-full text-sm"
						placeholder="Enter role name"
						{...register("role", {
							required: "Role name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.role?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-indigo-950"
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
};

export default CreateRoleModal;
