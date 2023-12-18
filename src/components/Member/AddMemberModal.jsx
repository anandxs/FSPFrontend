import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useInviteMemberMutation } from "../../features/member/memberApiSlice";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";

const AddMemberModal = ({ handleCreateToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId } = useParams();

	const [addMember, { error }] = useInviteMemberMutation();

	const onSubmit = ({ email, roleId }) => {
		const body = {
			email,
			roleId,
		};
		addMember({ projectId, body })
			.unwrap()
			.then(() => {
				handleCreateToggle();
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
		error: roleError,
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
		console.log(roleError);
		roleOptions = <option>Something went wrong!</option>;
	}

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Add Member</h1>
			<p className="text-red-600">{error?.data?.Message}</p>
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
					>
						{roleOptions}
					</select>
					<p className="text-red-600">{errors?.roleId?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-md font-bold px-3 py-1 rounded w-full"
				>
					Invite
				</button>
			</form>
		</div>
	);
};

export default AddMemberModal;
