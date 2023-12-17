import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useUpdateMemberMutation } from "../../features/member/memberApiSlice";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";

const UpdateMemberRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, memberId } = useParams();
	const [updateMemberRole] = useUpdateMemberMutation();

	const onSubmit = ({ roleId }) => {
		const body = {
			memberId,
			roleId,
		};
		console.log(body);
		updateMemberRole({ projectId, body })
			.unwrap()
			.then(() => {
				handleToggle();
			})
			.catch((err) => {
				console.log(err);
			});
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
			className="bg-accent p-3 w-1/4 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold mb-2 py-1">Edit Member Role</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<p className="text-sm text-red-600">{errors?.roleId?.message}</p>
				<select
					id="roleId"
					className="mb-3"
					{...register("roleId", {
						required: "Role is a required field.",
					})}
				>
					{roleOptions}
				</select>
				<div className="flex justify-between">
					<button
						className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
						type="submit"
					>
						Update
					</button>
					<button
						onClick={handleToggle}
						className="bg-orange-600 text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
						type="button"
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default UpdateMemberRoleModal;
