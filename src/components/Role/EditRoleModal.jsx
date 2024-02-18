import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RoleContext } from "./Roles";
import { useUpdateRoleMutation } from "../../features/role/roleApiSlice";
import LoadingButton from "../LoadingButton";

const EditRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const { projectId, roleId, init } = useContext(RoleContext);

	const [udpateRoleAsync, { error, isLoading, isSubmitting }] =
		useUpdateRoleMutation();

	useEffect(() => {
		setValue("role", init);
	}, []);

	const onSubmit = async ({ role }) => {
		const body = {
			name: role,
		};

		try {
			await udpateRoleAsync({
				projectId,
				roleId,
				body,
			}).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Edit Role</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
				<p className="text-red-600 text-xs">{error?.data?.Message}</p>
				<div className="space-y-1 text-sm">
					<input
						type="text"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("role", {
							required: "Role name is required.",
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.role?.message}</p>
				</div>
				{/* <div className="flex justify-between">
					<button
						type="submit"
						className="bg-blue-600 text-gray-50 px-3 py-0.5 text-sm rounded-sm w-2/5"
					>
						Update
					</button>
					<button
						type="submit"
						className="bg-orange-600 text-gray-50 px-3 py-0.5 text-sm rounded-sm w-2/5"
						onClick={handleToggle}
					>
						Cancel
					</button>
				</div> */}
				<div className="flex gap-2 justify-between">
					{isSubmitting || isLoading ? (
						<LoadingButton />
					) : (
						<button
							type="submit"
							className="block w-1/2 p-3 text-center rounded-sm text-gray-50 bg-blue-600"
						>
							Update
						</button>
					)}
					<button
						type="submit"
						className="block w-1/2 p-3 text-center rounded-sm text-gray-50 bg-orange-600"
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
