import { useForm } from "react-hook-form";
import { useUpdateMemberMutation } from "../../features/member/memberApiSlice";
import { useParams } from "react-router-dom";

const UpdateMemberRoleModal = ({ handleToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const { projectId, memberId } = useParams();
	const [updateMemberRole] = useUpdateMemberMutation();

	const onSubmit = ({ role }) => {
		const body = {
			memberId,
			role,
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

	return (
		<div
			className="bg-accent p-3 w-1/4 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-xl font-bold mb-2 py-1">Edit Role</h1>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<p className="text-sm text-red-600">{errors?.role?.message}</p>
				<select
					id="role"
					className="mb-3"
					{...register("role", {
						required: "Role is a required field.",
					})}
				>
					<option value="">Select Role</option>
					<option value="ADMIN">ADMIN</option>
					<option value="MEMBER">MEMBER</option>
					<option value="OBSERVER">OBSERVER</option>
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
