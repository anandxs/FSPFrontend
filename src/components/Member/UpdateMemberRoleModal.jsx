import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateMemberMutation } from "../../features/member/memberApiSlice";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";
import LoadingButton from "../LoadingButton";

const UpdateMemberRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, memberId } = useParams();
	const [updateMemberRole, { isLoading: updateLoading, isSubmitting }] =
		useUpdateMemberMutation();

	const onSubmit = async ({ roleId }) => {
		const body = {
			memberId,
			roleId,
		};
		try {
			await updateMemberRole({ projectId, body }).unwrap();
			handleToggle();
		} catch (err) {
			console.log(err);
		}
	};

	const {
		data: roles,
		isSuccess,
		isLoading,
		isError,
		error,
	} = useGetProjectRolesQuery({ projectId });
	let roleOptions;
	if (isLoading) {
		roleOptions = <option>Loading...</option>;
	} else if (isSuccess) {
		if (roles?.length === 0) {
			roleOptions = <option>No Roles</option>;
		} else {
			roleOptions = roles.map((role) => (
				<option key={role?.roleId} value={role?.roleId}>
					{role?.name}
				</option>
			));
		}
	} else if (isError) {
		console.log(error);
		roleOptions = <option>Something went wrong!</option>;
	}

	return (
		<div
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Edit Member Role</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<p className="text-red-600 text-xs">{errors?.roleId?.message}</p>
				<div className="space-y-1 text-sm">
					<select
						id="roleId"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("roleId", {
							required: "Role is a required field.",
						})}
					>
						{roleOptions}
					</select>
				</div>
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

export default UpdateMemberRoleModal;
