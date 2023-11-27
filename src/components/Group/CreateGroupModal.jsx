import { useForm } from "react-hook-form";
import { useCreateGroupMutation } from "../../features/group/groupApiSlice";
import { useParams } from "react-router-dom";

const CreateGroupModal = ({ handleGroupToggle }) => {
	const form = useForm();
	const { register, handleSubmit, formState } = form;
	const { errors } = formState;

	const [createGroup, { isLoading }] = useCreateGroupMutation();

	const { ownerId, projectId } = useParams();

	const handleCreateGroup = async ({ groupName }) => {
		try {
			const response = await createGroup({
				ownerId,
				projectId,
				groupName,
			}).unwrap();

			handleGroupToggle();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Create Group</h1>
			<form noValidate onSubmit={handleSubmit(handleCreateGroup)}>
				<p className="text-red-600 text-xs">{errors?.groupName?.message}</p>
				<input
					type="text"
					className="block mb-2 w-full"
					placeholder="Enter group name"
					{...register("groupName", {
						required: "Group name is required.",
					})}
				/>
				<button
					type="submit"
					className="bg-primary text-white text-sm text-bold px-3 py-1 rounded w-full disabled:opacity-50"
					disabled={isLoading}
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default CreateGroupModal;
