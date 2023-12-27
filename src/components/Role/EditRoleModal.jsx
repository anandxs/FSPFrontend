import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RoleContext } from "./Roles";
import { useUpdateRoleMutation } from "../../features/role/roleApiSlice";

const EditRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const { projectId, roleId, init } = useContext(RoleContext);

	const [udpateRoleAsync, { error }] = useUpdateRoleMutation();

	useEffect(() => {
		setValue("role", init);
	}, []);

	const onSubmit = ({ role }) => {
		const body = {
			name: role,
		};

		udpateRoleAsync({
			projectId,
			roleId,
			body,
		})
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
			<h1 className="text-2xl font-bold mb-1 pt-1">Edit Role</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<p className="text-red-600 text-xs my-1">{error?.data?.Message}</p>
				<div className="mb-2">
					<input
						type="text"
						className="w-full"
						{...register("role", {
							required: "Role name is required.",
						})}
					/>
					<p className="text-red-600 text-xs pt-1">{errors?.role?.message}</p>
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
						onClick={handleToggle}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditRoleModal;
