import { useState } from "react";
import { useSelector } from "react-redux";
import {
	useGetProjectGroupsQuery,
	useUpdateProjectGroupMutation,
} from "../../features/group/groupApiSlice";
import {
	selectOwnerId,
	selectProjectId,
} from "../../features/project/projectSlice";
import { useForm } from "react-hook-form";
import DeleteGroup from "./DeleteGroup";

const Groups = () => {
	const projectId = useSelector(selectProjectId);
	const ownerId = useSelector(selectOwnerId);

	const [editToggle, setEditToggle] = useState({ toggle: false, id: null });

	const { data, isLoading, isError, error, isSuccess } =
		useGetProjectGroupsQuery({
			ownerId,
			projectId,
		});
	const [updateGroup] = useUpdateProjectGroupMutation();

	const form = useForm();
	const { register, handleSubmit, formState, setValue } = form;
	const { errors } = formState;

	const handleToggle = (g) => {
		setEditToggle((prev) => ({
			toggle: !prev.toggle,
			id: g.groupId,
		}));
		setValue("groupName", g.name);
	};

	const handleUpdate = async ({ groupName }) => {
		try {
			const response = await updateGroup({
				ownerId,
				projectId,
				groupId: editToggle.id,
				groupName,
			}).unwrap();
			setEditToggle({ id: null, toggle: false });
		} catch (err) {
			console.log(err);
		}
	};

	let content = "";
	if (isLoading) content = <p>Loading...</p>;
	else if (isSuccess) {
		content = (
			<table className="table-fixed w-10/12 mt-3 border border-black">
				<thead className="table-header-group bg-primary text-white">
					<tr>
						<th className="text-left px-2 py-1 border border-black">
							Group Name
						</th>
						<th className="text-left px-2 py-1 border border-black">Options</th>
					</tr>
				</thead>
				<tbody>
					{data.map((g) => (
						<tr key={g.groupId}>
							<td className="px-2 py-1 text-sm border border-black">
								{editToggle.toggle && editToggle.id === g.groupId ? (
									<form
										className="flex flex-row gap-1"
										onSubmit={handleSubmit(handleUpdate)}
										noValidate
									>
										<input
											type="text"
											{...register("groupName", {
												required: "Group name is required.",
											})}
										/>
										<p className="text-red-600 text-xs pt-1">
											{errors?.groupName?.message}
										</p>
										<button
											type="submit"
											className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
										>
											Update
										</button>
									</form>
								) : (
									g.name
								)}
							</td>
							<td className="px-2 py-1 flex gap-4 border border-black">
								<button
									className="bg-primary text-white px-3 py-0.5 text-sm rounded-sm"
									onClick={() => handleToggle(g)}
								>
									{editToggle.toggle && editToggle.id === g.groupId
										? "Cancel"
										: "Edit"}
								</button>
								<DeleteGroup
									params={{ ownerId, projectId, groupId: g.groupId }}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	} else if (isError) {
		console.log(error);
		content = <p>Something went wrong!</p>;
	}

	return (
		<div className="col-span-10 p-2 mt-3 ml-3">
			<h2 className="text-xl font-bold hover:underline">Project Groups</h2>
			{content}
		</div>
	);
};

export default Groups;
