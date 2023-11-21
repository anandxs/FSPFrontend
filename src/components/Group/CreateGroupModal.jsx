import { useForm } from "react-hook-form";
import { useCreateGroupMutation } from "../../features/group/groupApiSlice";
import { createAction } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const CreateGroupModal = ({ setCreateGroupToggle }) => {
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
			setCreateGroupToggle((prev) => !prev);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<form
			className="bg-accent p-3 absolute top-24"
			noValidate
			onSubmit={handleSubmit(handleCreateGroup)}
		>
			<p className="text-red-600 text-xs">{errors?.groupName?.message}</p>
			<input
				type="text"
				className="block mb-2"
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
	);
};

export default CreateGroupModal;
