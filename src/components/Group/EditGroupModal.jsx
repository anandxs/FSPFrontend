import { useEffect } from "react";
import { useUpdateProjectGroupMutation } from "../../features/group/groupApiSlice";
import { useForm } from "react-hook-form";

const EditGroupModal = ({ handleGroupToggle, params, init }) => {
	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	useEffect(() => {
		setValue("groupName", init);
	}, []);

	const [updateGroup] = useUpdateProjectGroupMutation();

	const onSubmit = ({ groupName }) => {
		const { groupId } = params;
		const body = {
			name: groupName,
		};

		updateGroup({
			groupId,
			body,
		})
			.unwrap()
			.then(() => {
				handleGroupToggle();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div
			className="bg-accent p-3 w-1/3 min-w-max"
			onClick={(e) => e.stopPropagation()}
		>
			<h1 className="text-2xl font-bold mb-2 py-1">Edit Group</h1>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="mb-2">
					<input
						type="text"
						className="w-full"
						{...register("groupName", {
							required: "Group name is required.",
						})}
					/>
					<p className="text-red-600 text-xs pt-1">
						{errors?.groupName?.message}
					</p>
				</div>
				<div className="flex justify-between">
					<button
						type="submit"
						className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
					>
						Update
					</button>
					<button
						type="submit"
						className="bg-orange-600 text-white px-3 py-0.5 text-sm rounded-sm w-2/5"
						onClick={handleGroupToggle}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditGroupModal;
