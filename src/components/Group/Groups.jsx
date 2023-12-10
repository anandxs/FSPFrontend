import { useParams } from "react-router-dom";
import { useGetProjectGroupsQuery } from "../../features/group/groupApiSlice";
import Table from "../Table";
import DeleteGroup from "./DeleteGroup";
import EditGroup from "./EditGroup";

const Groups = () => {
	const { projectId } = useParams();

	const { data, isLoading, isError, error, isSuccess } =
		useGetProjectGroupsQuery({
			projectId,
		});

	const columns = [
		{
			key: "name",
			header: "Name",
		},
		{
			key: "groupId",
			header: "Options",
		},
	];

	const editAction = (groupId) => {
		const params = {
			projectId,
			groupId,
		};
		return <EditGroup params={params} />;
	};

	const deleteAction = (groupId) => {
		const params = {
			projectId,
			groupId,
		};
		return <DeleteGroup params={params} />;
	};

	let content = "";
	if (isLoading) content = <p>Loading...</p>;
	else if (isSuccess) {
		if (data.length === 0) {
			content = <p className="py-1 text-sm">Nothing to display</p>;
		} else {
			// content = (
			// 	<table className="table-fixed w-10/12 mt-3 border border-black">
			// 		<thead className="table-header-group bg-primary text-white">
			// 			<tr>
			// 				<th className="text-left px-2 py-1 border border-black">
			// 					Group Name
			// 				</th>
			// 				<th className="text-left px-2 py-1 border border-black">
			// 					Options
			// 				</th>
			// 			</tr>
			// 		</thead>
			// 		<tbody>
			// 			{data.map((g) => (
			// 				<tr key={g.groupId}>
			// 					<td className="px-2 py-1 text-sm border border-black">
			// 						{g.name}
			// 					</td>
			// 					<td className="px-2 py-1 flex gap-4 border border-black">
			// 						<EditGroup
			// 							init={g.name}
			// 							params={{ ownerId, projectId, groupId: g.groupId }}
			// 						/>
			// 						<DeleteGroup
			// 							params={{ ownerId, projectId, groupId: g.groupId }}
			// 						/>
			// 					</td>
			// 				</tr>
			// 			))}
			// 		</tbody>
			// 	</table>
			// );
			content = (
				<Table
					data={data}
					columns={columns}
					editAction={editAction}
					deleteAction={deleteAction}
				/>
			);
		}
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
