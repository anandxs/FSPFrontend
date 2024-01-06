import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useInviteMemberMutation } from "../../features/member/memberApiSlice";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";
import { toast } from "react-toastify";

const AddMemberModal = ({ handleCreateToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;
	const { projectId } = useParams();

	const [addMember, { error }] = useInviteMemberMutation();
	const onSubmit = async ({ email, roleId }) => {
		const body = {
			email,
			roleId,
		};

		try {
			const response = await addMember({ projectId, body }).unwrap();
			toast.success(response?.message);
			handleCreateToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="bg-accent p-3 w-screen sm:w-2/3 sm:max-w-sm"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold mb-2">Add Member</h1>
			<p className="text-red-600 text-xs mb-1">{error?.data?.Message}</p>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-1">
					<label htmlFor="email" className="font-semibold text-base block">
						Email
					</label>
					<input
						type="email"
						id="email"
						className="block w-full text-sm"
						{...register("email", {
							required: "Email is required.",
						})}
					/>
					<p className="text-red-600 text-xs mb-1">{errors?.email?.message}</p>
				</div>
				<div className="mb-1">
					<label htmlFor="role" className="font-semibold text-base block">
						Role
					</label>
					<select
						id="role"
						className="block w-full text-sm"
						{...register("roleId", {
							required: "Role is a required field.",
						})}
					>
						<GetRoles projectId={projectId} />
					</select>
					<p className="text-red-600 text-xs mb-1">{errors?.roleId?.message}</p>
				</div>
				<button
					type="submit"
					className="bg-primary text-white text-sm p-1 font-semibold rounded-sm w-full"
				>
					Invite
				</button>
			</form>
		</div>
	);
};

const GetRoles = ({ projectId }) => {
	const {
		data: roles,
		isSuccess,
		isLoading,
		isError,
	} = useGetProjectRolesQuery({ projectId });

	if (isLoading) return <option>Loading...</option>;
	else if (isSuccess)
		return roles.map((role) => (
			<option key={role?.roleId} value={role?.roleId}>
				{role?.name}
			</option>
		));
	else if (isError) return <option>Something went wrong!</option>;
};

export default AddMemberModal;
