import { useForm } from "react-hook-form";
import { useGetProjectRolesQuery } from "../../features/role/roleApiSlice";
import { useParams } from "react-router-dom";
import { useAddMemberMutation } from "../../features/member/memberApiSlice";

const AddMemberModal = ({ handleCreateToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { ownerId, projectId } = useParams();

	const { data, isLoading, isSuccess, isError, error } =
		useGetProjectRolesQuery({ ownerId, projectId });

	const [
		addMember,
		{ isLoading: ongoing, isSuccess: success, error: postError },
	] = useAddMemberMutation();

	let options = "";
	if (isLoading) {
		options = <option>Loading...</option>;
	} else if (isSuccess) {
		options = data?.map((r) => (
			<option key={r.roleId} value={r.roleId}>
				{r.name}
			</option>
		));
	} else if (isError) {
		console.log(error);
		options = <option>Something went wrong</option>;
	}

	const onSubmit = async ({ email, roleId }) => {
		try {
			await addMember({ ownerId, projectId, email, roleId }).unwrap();
			handleCreateToggle();
		} catch (err) {
			if (err.status === 400) {
			}
		}
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Add Member</h1>
			<p className="text-red-600">{postError?.data?.Message}</p>
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
						{options}
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
