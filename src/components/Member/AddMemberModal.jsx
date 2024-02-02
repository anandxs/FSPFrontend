import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useInviteMemberMutation } from "../../features/member/memberApiSlice";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";
import { toast } from "react-toastify";
import LoadingButton from "../LoadingButton";

const AddMemberModal = ({ handleCreateToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;
	const { projectId } = useParams();

	const [addMember, { error, isLoading, isSubmitting }] =
		useInviteMemberMutation();
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
			className="pt-4 w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-50 text-gray-800"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold text-left">Add Member</h1>
			<p className="text-red-600 text-xs">{error?.data?.Message}</p>
			<form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="space-y-1 text-sm">
					<input
						type="email"
						id="email"
						placeholder="Email"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("email", {
							required: "Email is required.",
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
								message: "Enter a valid email address",
							},
						})}
					/>
					<p className="text-red-600 text-xs">{errors?.email?.message}</p>
				</div>
				<div className="space-y-1 text-sm">
					<select
						id="role"
						className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-blue-600"
						{...register("roleId", {
							required: "Role is a required field.",
						})}
					>
						<GetRoles projectId={projectId} />
					</select>
					<p className="text-red-600 text-xs">{errors?.roleId?.message}</p>
				</div>
				{isSubmitting || isLoading ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="block w-full p-3 text-center rounded-sm text-gray-50 bg-blue-600"
					>
						Invite
					</button>
				)}
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
